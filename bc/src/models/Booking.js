// src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: [
      'plumbing', 'electrical', 'carpentry', 'cleaning', 
      'moving', 'painting', 'gardening', 'ac_repair', 
      'tv_installation', 'appliance_repair', 'handyman',
      'pest_control', 'deep_cleaning', 'home_maintenance'
    ]
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  estimatedDuration: {
    type: Number, // in hours
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    landmark: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  pricing: {
    hourlyRate: Number,
    estimatedCost: Number,
    actualCost: Number,
    materials: [{
      name: String,
      cost: Number,
      quantity: Number
    }],
    laborCost: Number,
    totalCost: Number
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'advance_paid', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    method: String,
    transactionId: String,
    advanceAmount: Number,
    remainingAmount: Number
  },
  images: {
    before: [String],
    after: [String],
    issues: [String]
  },
  timeline: [{
    status: String,
    timestamp: Date,
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  rating: {
    customer: {
      rating: Number,
      review: String,
      date: Date
    },
    worker: {
      rating: Number,
      review: String,
      date: Date
    }
  },
  communication: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    timestamp: Date,
    type: {
      type: String,
      enum: ['text', 'image', 'location'],
      default: 'text'
    }
  }],
  emergencyService: {
    type: Boolean,
    default: false
  },
  cancellationReason: String,
  refundAmount: Number
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ customer: 1, createdAt: -1 });
bookingSchema.index({ worker: 1, createdAt: -1 });
bookingSchema.index({ service: 1, status: 1 });
bookingSchema.index({ scheduledDate: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);