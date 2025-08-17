// src/models/Worker.js
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  services: [{
    type: String,
    enum: [
      'plumbing', 'electrical', 'carpentry', 'cleaning', 
      'moving', 'painting', 'gardening', 'ac_repair', 
      'tv_installation', 'appliance_repair', 'handyman',
      'pest_control', 'deep_cleaning', 'home_maintenance'
    ]
  }],
  experience: {
    type: Number,
    min: 0,
    default: 0
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  serviceArea: {
    cities: [String],
    radius: {
      type: Number,
      default: 10 // km
    }
  },
  availability: {
    monday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    tuesday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    wednesday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    thursday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    friday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    saturday: { 
      isAvailable: { type: Boolean, default: true },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    },
    sunday: { 
      isAvailable: { type: Boolean, default: false },
      start: { type: String, default: "09:00" }, 
      end: { type: String, default: "18:00" }
    }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  completedJobs: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAvailableNow: {
    type: Boolean,
    default: true
  },
  documents: {
    idProof: String,
    skillCertificates: [String],
    backgroundCheck: String
  },
  portfolio: [{
    image: String,
    description: String,
    service: String
  }],
  responseTime: {
    type: Number, // in minutes
    default: 30
  },
  emergencyService: {
    type: Boolean,
    default: false
  },
  languages: [{
    type: String,
    enum: ['english', 'hindi', 'tamil', 'telugu', 'kannada', 'malayalam']
  }]
}, {
  timestamps: true
});

// Create compound indexes
workerSchema.index({ services: 1, isActive: 1 });
workerSchema.index({ 'serviceArea.cities': 1, services: 1 });
workerSchema.index({ rating: -1, totalReviews: -1 });

module.exports = mongoose.model('Worker', workerSchema);