const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    category: {
      type: String,
      enum: ['News', 'Announcement', 'Event', 'Bulletin', 'Achievement'],
      default: 'News',
    },
    image: { type: String, default: '' },
    author: { type: String, default: 'MSTI Editorial' },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
