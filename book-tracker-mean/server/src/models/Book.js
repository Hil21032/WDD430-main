const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      default: '',
      trim: true
    },
    pageCount: {
      type: Number,
      min: 1,
      default: null
    },
    status: {
      type: String,
      enum: ['to-read', 'reading', 'hold', 'completed'],
      default: 'to-read'
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    notes: {
      type: String,
      default: ''
    },
    startDate: {
      type: Date,
      default: null
    },
    finishDate: {
      type: Date,
      default: null
    },
    coverUrl: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);
