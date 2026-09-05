const Contact = require('../models/Contact');

// POST submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, enquiryType } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }
    const contact = await Contact.create({ name, email, phone, subject, message, enquiryType });
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. We will get back to you shortly.',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all enquiries (admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Contact.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
