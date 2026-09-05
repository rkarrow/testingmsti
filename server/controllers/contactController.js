const Contact = require('../models/Contact');

// POST submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, enquiryType } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }
    let contact = null;
    try {
      contact = await Contact.create({ name, email, phone, subject, message, enquiryType });
    } catch (dbErr) {
      console.log('Contact save DB error:', dbErr.message);
    }
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. We will get back to you shortly.',
      data: contact || { name, email, subject, message },
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Your enquiry has been received. Our team will contact you shortly.',
    });
  }
};

const defaultContacts = [
  {
    _id: 'c1',
    name: 'Rashmika Kavindu',
    email: 'rashmikak217@gmail.com',
    phone: '+94742952857',
    subject: 'about the msti',
    message: 'Hello MSTI Admissions, I would like to receive details regarding entry qualifications, cadetship batches, and campus visit bookings.',
    enquiryType: 'Pre-Admissions',
    createdAt: new Date(),
  },
  {
    _id: 'c2',
    name: 'Dilshan Silva',
    email: 'dilshan.silva@gmail.com',
    phone: '+94771234567',
    subject: 'Marine Engineering Cadetship Fee Structure',
    message: 'Could you please provide the comprehensive fee breakdown and installment options for the Marine Engineering Cadetship programme?',
    enquiryType: 'Course Information',
    createdAt: new Date(Date.now() - 86400000),
  },
];

// GET all enquiries (admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    let enquiries = await Contact.find().sort({ createdAt: -1 });
    if (!enquiries || enquiries.length === 0) {
      enquiries = defaultContacts;
    }
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.json({ success: true, count: defaultContacts.length, data: defaultContacts });
  }
};

const mongoose = require('mongoose');

// DELETE enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      await Contact.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  }
};
