const express = require('express');
const router = express.Router();
const { submitContact, getAllEnquiries, deleteEnquiry } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(submitContact)
  .get(protect, getAllEnquiries);

router.route('/:id')
  .delete(protect, deleteEnquiry);

module.exports = router;
