const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
  title:       { type: String, default: '' },
  description: { type: String, default: '' },
  imageUrl:    { type: String, required: true },
  category:    { type: String, default: 'General' },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
})

module.exports = mongoose.model('Gallery', gallerySchema)
