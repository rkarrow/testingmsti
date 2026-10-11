const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: {
      type: String,
      required: true,
    },
    duration: { type: String, required: true },
    level: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    intake: { type: String },
    requirements: [{ type: String }],
    outcomes: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
