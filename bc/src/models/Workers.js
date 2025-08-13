// src/models/Worker.js
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    type: String,
    enum: ['plumbing', 'electrical', 'carpentry', 'cleaning', 'moving', 'painting', 'gardening']
  }],
  experience: {
    type: Number,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  availability: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String }
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
  isActive: {
    type: Boolean,
    default: false
  },
  documents: {
    idProof: String,
    skillCertificates: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema);
