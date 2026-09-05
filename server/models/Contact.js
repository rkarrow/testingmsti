const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    enquiryType: {
      type: String,
      enum: ['Pre-Admissions', 'Course Information', 'General Enquiry', 'Medical Standards', 'Other'],
      default: 'General Enquiry',
    },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Responded'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
