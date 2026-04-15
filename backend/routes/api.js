const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const { protect, adminOnly, doctorOnly } = require('../middleware/authMiddleware');

// Rate Limiting Middleware for Public Forms
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' }
});

// @route   POST /api/appointments
// @desc    Submit an appointment request (Registered Patients Only)
// @access  Private (Patient/User)
router.post('/appointments', protect, async (req, res) => {
  try {
    const { name, phone, country, date, service, message } = req.body;

    if (!name || !phone || !date || !service) {
      return res.status(400).json({ success: false, message: 'Name, phone, date, and service are required fields.' });
    }

    const newAppointment = await Appointment.create({
      name, 
      email: req.user.email, // Use logged-in user email
      phone, 
      country, 
      date, 
      service, 
      message,
      patientId: req.user._id
    });

    res.status(201).json({ success: true, message: 'Appointment submitted successfully', data: newAppointment });
  } catch (error) {
    console.error('Error submitting appointment:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting appointment' });
  }
});

// @route   GET /api/appointments/me
// @desc    Get appointments for the logged-in patient
// @access  Private
router.get('/appointments/me', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching my appointments:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching appointments' });
  }
});

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private (Doctor or Admin Only)
router.get('/appointments', protect, doctorOnly, async (req, res) => {
  try {
    // Optionally we can populate patient info here
    const appointments = await Appointment.find().populate('patientId', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching appointments' });
  }
});

// @route   POST /api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/contact', formLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
    }

    const newContact = await Contact.create({
      name, email, subject, message
    });

    res.status(201).json({ success: true, message: 'Contact message submitted successfully', data: newContact });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting contact message' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (Admin Only)
router.get('/contact', protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching contact messages' });
  }
});

module.exports = router;
