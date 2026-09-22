const express = require('express')
const router = express.Router()
const Gallery = require('../models/Gallery')
const { protect } = require('../middleware/auth')

// GET /api/gallery — Public: all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: photos })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery' })
  }
})

// POST /api/gallery — Admin: add photo
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, imageUrl, category, order } = req.body
    if (!imageUrl) return res.status(400).json({ success: false, message: 'imageUrl is required' })
    const photo = await Gallery.create({ title, description, imageUrl, category, order: order || 0 })
    res.status(201).json({ success: true, data: photo })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add photo' })
  }
})

// PUT /api/gallery/:id — Admin: update photo
router.put('/:id', protect, async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!photo) return res.status(404).json({ success: false, message: 'Photo not found' })
    res.json({ success: true, data: photo })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update photo' })
  }
})

// DELETE /api/gallery/:id — Admin: delete photo
router.delete('/:id', protect, async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndDelete(req.params.id)
    if (!photo) return res.status(404).json({ success: false, message: 'Photo not found' })
    res.json({ success: true, message: 'Photo deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete photo' })
  }
})

module.exports = router
