const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// @route   POST /api/upload
// @desc    Upload an image file (Up to 10MB)
// @access  Private (Admin)
router.post('/', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Image size is too large! Maximum allowed upload size is 10MB.',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Failed to upload image',
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      url: imageUrl,
      fileName: req.file.filename,
    });
  });
});

module.exports = router;
