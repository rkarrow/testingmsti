const mongoose = require('mongoose')

const pageViewSchema = new mongoose.Schema({
  page:      { type: String, required: true },
  referrer:  { type: String, default: '' },
  device:    { type: String, default: 'unknown' },  // mobile / desktop / tablet
  browser:   { type: String, default: 'unknown' },
  os:        { type: String, default: 'unknown' },
  country:   { type: String, default: 'Unknown' },
  sessionId: { type: String, default: '' },
  ip:        { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
})

// Index for fast aggregation queries
pageViewSchema.index({ timestamp: -1 })
pageViewSchema.index({ page: 1 })
pageViewSchema.index({ sessionId: 1 })

module.exports = mongoose.model('PageView', pageViewSchema)
