// src/routes/workers.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Worker = require('../models/Workers');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all workers with filters
router.get('/', async (req, res) => {
  try {
    const {
      service,
      city,
      minRating,
      maxRate,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
      search
    } = req.query;

    // Build filter query
    let filter = { isActive: true };
    
    if (service) {
      filter.services = { $in: [service] };
    }
    
    if (city) {
      filter['serviceArea.cities'] = { $in: [city] };
    }
    
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    // Build sort object
    let sort = {};
    if (sortBy === 'rating') {
      sort = { rating: sortOrder === 'desc' ? -1 : 1, totalReviews: -1 };
    } else if (sortBy === 'rate') {
      sort = { hourlyRate: sortOrder === 'desc' ? -1 : 1 };
    } else if (sortBy === 'experience') {
      sort = { experience: sortOrder === 'desc' ? -1 : 1 };
    } else {
      sort = { createdAt: -1 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let workers = await Worker.find(filter)
      .populate('userId', 'name email phone profileImage rating totalReviews')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Apply rate filter after population if needed
    if (maxRate) {
      workers = workers.filter(worker => worker.hourlyRate <= parseFloat(maxRate));
    }

    // Apply search filter if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      workers = workers.filter(worker => 
        worker.userId.name.match(searchRegex) ||
        worker.services.some(service => service.match(searchRegex))
      );
    }

    // Calculate total for pagination
    const total = await Worker.countDocuments(filter);

    res.json({
      workers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + workers.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get workers error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('userId', 'name email phone profileImage rating totalReviews address');

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Get recent reviews/bookings
    const recentBookings = await Booking.find({
      worker: worker.userId._id,
      status: 'completed',
      'rating.customer.rating': { $exists: true }
    })
    .populate('customer', 'name profileImage')
    .select('rating.customer service createdAt')
    .sort({ createdAt: -1 })
    .limit(5);

    res.json({
      worker: {
        ...worker.toObject(),
        recentReviews: recentBookings
      }
    });
  } catch (error) {
    console.error('Get worker error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update worker profile (only by the worker themselves)
router.put('/profile', auth, [
  body('services').optional().isArray(),
  body('hourlyRate').optional().isNumeric(),
  body('experience').optional().isNumeric(),
  body('serviceArea.cities').optional().isArray(),
  body('availability').optional().isObject()
], async (req, res) => {
  try {
    // Check if user is a worker
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers can update worker profile' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }

    // Update worker profile
    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        worker[key] = updates[key];
      }
    });

    await worker.save();

    const populatedWorker = await Worker.findById(worker._id)
      .populate('userId', 'name email phone profileImage');

    res.json({
      message: 'Worker profile updated successfully',
      worker: populatedWorker
    });
  } catch (error) {
    console.error('Update worker profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle worker availability
router.patch('/availability', auth, async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers can update availability' });
    }

    const { isAvailableNow } = req.body;
    
    const worker = await Worker.findOneAndUpdate(
      { userId: req.user._id },
      { isAvailableNow },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      isAvailableNow: worker.isAvailableNow
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker's dashboard stats
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }

    // Get booking stats
    const [totalBookings, completedBookings, activeBookings, thisMonthBookings, totalEarnings] = await Promise.all([
      Booking.countDocuments({ worker: req.user._id }),
      Booking.countDocuments({ worker: req.user._id, status: 'completed' }),
      Booking.countDocuments({ worker: req.user._id, status: { $in: ['accepted', 'in-progress'] } }),
      Booking.countDocuments({
        worker: req.user._id,
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
      Booking.aggregate([
        { $match: { worker: req.user._id, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$pricing.totalCost' } } }
      ])
    ]);

    const earnings = totalEarnings[0]?.total || 0;

    res.json({
      stats: {
        totalBookings,
        completedBookings,
        activeBookings,
        thisMonthBookings,
        totalEarnings: earnings,
        rating: worker.rating,
        totalReviews: worker.totalReviews,
        completedJobs: worker.completedJobs,
        isActive: worker.isActive,
        isAvailableNow: worker.isAvailableNow
      }
    });
  } catch (error) {
    console.error('Get worker stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get available services list
router.get('/services/list', (req, res) => {
  const services = [
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'carpentry', name: 'Carpentry', icon: '🔨' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
    { id: 'moving', name: 'Moving & Packing', icon: '📦' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
    { id: 'gardening', name: 'Gardening', icon: '🌱' },
    { id: 'ac_repair', name: 'AC Repair', icon: '❄️' },
    { id: 'tv_installation', name: 'TV Installation', icon: '📺' },
    { id: 'appliance_repair', name: 'Appliance Repair', icon: '🔧' },
    { id: 'handyman', name: 'Handyman', icon: '🛠️' },
    { id: 'pest_control', name: 'Pest Control', icon: '🐛' },
    { id: 'deep_cleaning', name: 'Deep Cleaning', icon: '✨' },
    { id: 'home_maintenance', name: 'Home Maintenance', icon: '🏠' }
  ];

  res.json({ services });
});

module.exports = router;