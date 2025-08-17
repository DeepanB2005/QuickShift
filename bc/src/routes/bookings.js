// src/routes/bookings.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Worker = require('../models/Workers');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new booking
router.post('/', auth, [
  body('workerId').isMongoId().withMessage('Valid worker ID is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('scheduledDate').isISO8601().withMessage('Valid date is required'),
  body('scheduledTime.start').notEmpty().withMessage('Start time is required'),
  body('estimatedDuration').isNumeric().withMessage('Duration must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { workerId, service, title, description, scheduledDate, scheduledTime, estimatedDuration, address, priority } = req.body;

    // Check if worker exists and is active
    const worker = await Worker.findOne({ userId: workerId, isActive: true })
      .populate('userId', 'name email phone');
    
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found or inactive' });
    }

    // Check if service is in worker's services
    if (!worker.services.includes(service)) {
      return res.status(400).json({ message: 'Worker does not provide this service' });
    }

    // Calculate estimated cost
    const estimatedCost = worker.hourlyRate * estimatedDuration;

    // Create booking
    const booking = new Booking({
      customer: req.user._id,
      worker: workerId,
      service,
      title,
      description,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      estimatedDuration,
      address,
      priority: priority || 'medium',
      pricing: {
        hourlyRate: worker.hourlyRate,
        estimatedCost,
        laborCost: estimatedCost
      },
      timeline: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Booking created',
        updatedBy: req.user._id
      }]
    });

    await booking.save();

    // Populate booking for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone profileImage')
      .populate('worker', 'name email phone profileImage');

    // Here you could emit socket event to worker
    if (req.io) {
      req.io.to(workerId).emit('new-booking', populatedBooking);
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's bookings (customer or worker)
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (req.user.role === 'customer') {
      filter.customer = req.user._id;
    } else if (req.user.role === 'worker') {
      filter.worker = req.user._id;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await Booking.find(filter)
      .populate('customer', 'name email phone profileImage')
      .populate('worker', 'name email phone profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + bookings.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone profileImage address')
      .populate('worker', 'name email phone profileImage')
      .populate('timeline.updatedBy', 'name');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (booking.customer._id.toString() !== req.user._id.toString() && 
        booking.worker._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status (worker actions)
router.patch('/:id/status', auth, [
  body('status').isIn(['accepted', 'rejected', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('note').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, note } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the assigned worker
    if (booking.worker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only assigned worker can update status' });
    }

    // Validate status transition
    const allowedTransitions = {
      'pending': ['accepted', 'rejected'],
      'accepted': ['in-progress', 'cancelled'],
      'in-progress': ['completed', 'cancelled'],
    };

    if (!allowedTransitions[booking.status]?.includes(status)) {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    // Update booking
    booking.status = status;
    booking.timeline.push({
      status,
      timestamp: new Date(),
      note: note || `Status changed to ${status}`,
      updatedBy: req.user._id
    });

    // If completed, update worker's completed jobs count
    if (status === 'completed') {
      await Worker.findOneAndUpdate(
        { userId: req.user._id },
        { $inc: { completedJobs: 1 } }
      );
    }

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone profileImage')
      .populate('worker', 'name email phone profileImage');

    // Emit socket event to customer
    if (req.io) {
      req.io.to(booking.customer.toString()).emit('booking-status-updated', populatedBooking);
    }

    res.json({
      message: 'Booking status updated successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel booking (customer)
router.patch('/:id/cancel', auth, [
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the customer
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only customer can cancel booking' });
    }

    // Check if booking can be cancelled
    if (!['pending', 'accepted'].includes(booking.status)) {
      return res.status(400).json({ message: 'Booking cannot be cancelled at this stage' });
    }

    // Update booking
    booking.status = 'cancelled';
    booking.cancellationReason = reason || 'Cancelled by customer';
    booking.timeline.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: `Cancelled: ${reason || 'No reason provided'}`,
      updatedBy: req.user._id
    });

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone profileImage')
      .populate('worker', 'name email phone profileImage');

    // Emit socket event to worker
    if (req.io) {
      req.io.to(booking.worker.toString()).emit('booking-cancelled', populatedBooking);
    }

    res.json({
      message: 'Booking cancelled successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add rating and review
router.post('/:id/review', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, review } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    // Check user authorization and prevent duplicate reviews
    if (req.user._id.toString() === booking.customer.toString()) {
      if (booking.rating.customer.rating) {
        return res.status(400).json({ message: 'Already reviewed this booking' });
      }
      
      booking.rating.customer = {
        rating,
        review: review || '',
        date: new Date()
      };

      // Update worker's overall rating
      await updateWorkerRating(booking.worker, rating);
      
    } else if (req.user._id.toString() === booking.worker.toString()) {
      if (booking.rating.worker.rating) {
        return res.status(400).json({ message: 'Already reviewed this booking' });
      }
      
      booking.rating.worker = {
        rating,
        review: review || '',
        date: new Date()
      };

      // Update customer's overall rating
      await updateUserRating(booking.customer, rating);
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    await booking.save();

    res.json({
      message: 'Review added successfully',
      booking
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to update worker rating
async function updateWorkerRating(workerId, newRating) {
  const worker = await Worker.findOne({ userId: workerId });
  if (worker) {
    const totalRating = (worker.rating * worker.totalReviews) + newRating;
    worker.totalReviews += 1;
    worker.rating = totalRating / worker.totalReviews;
    await worker.save();

    // Also update user rating
    await User.findByIdAndUpdate(workerId, {
      rating: worker.rating,
      totalReviews: worker.totalReviews
    });
  }
}

// Helper function to update user rating
async function updateUserRating(userId, newRating) {
  const user = await User.findById(userId);
  if (user) {
    const totalRating = (user.rating * user.totalReviews) + newRating;
    user.totalReviews += 1;
    user.rating = totalRating / user.totalReviews;
    await user.save();
  }
}

module.exports = router;