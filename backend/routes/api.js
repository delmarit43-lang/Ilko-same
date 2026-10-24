const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const prisma = require('../db');
const { protect, adminOnly, doctorOnly } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');
const validateRequest = require('../middleware/validateRequest');
const { z } = require('zod');

// Rate Limiting for Public Forms
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' }
});

// Zod Schemas
const appointmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Valid phone is required"),
  country: z.string().optional(),
  date: z.string().datetime({ message: "Invalid date format" }),
  service: z.string().min(2, "Service is required"),
  message: z.string().optional()
});

const statusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled'], {
    errorMap: () => ({ message: "Invalid status value" })
  })
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(5, "Message is required")
});

// ===================== APPOINTMENTS =====================

// @route   POST /api/appointments
// @desc    Book an appointment (Logged-in patients only)
// @access  Private
router.post('/appointments', protect, validateRequest(appointmentSchema), asyncHandler(async (req, res) => {
  const { name, phone, country, date, service, message } = req.body;
  
  const newAppointment = await prisma.appointment.create({
    data: {
      name,
      email: req.user.email,
      phone,
      country,
      date,
      service,
      message,
      patientId: req.user.id,
      status: 'pending'
    }
  });
  res.status(201).json({ success: true, message: 'Appointment booked successfully', data: newAppointment });
}));

// @route   GET /api/appointments/me
// @desc    Get MY appointments (Patient's own only)
// @access  Private
router.get('/appointments/me', protect, asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { patientId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  const mappedAppointments = appointments.map(a => ({ ...a, _id: a.id }));
  res.status(200).json({ success: true, data: mappedAppointments });
}));

// @route   GET /api/appointments
// @desc    Get ALL appointments (Doctor + Admin only)
// @access  Private (Doctor/Admin)
router.get('/appointments', protect, doctorOnly, asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  const mappedAppointments = appointments.map(a => ({ ...a, _id: a.id }));
  res.status(200).json({ success: true, data: mappedAppointments });
}));

// @route   PATCH /api/appointments/:id/status
// @desc    Update appointment status (Doctor/Admin only)
// @access  Private (Doctor/Admin)
router.patch('/appointments/:id/status', protect, doctorOnly, validateRequest(statusSchema), asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const existing = await prisma.appointment.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ success: false, message: 'Appointment not found' });

  const appointment = await prisma.appointment.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.status(200).json({ success: true, data: { ...appointment, _id: appointment.id } });
}));

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment (Admin only)
// @access  Private (Admin)
router.delete('/appointments/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  const existing = await prisma.appointment.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ success: false, message: 'Appointment not found' });

  await prisma.appointment.delete({
    where: { id: req.params.id }
  });
  res.status(200).json({ success: true, message: 'Appointment deleted' });
}));

// @route   DELETE /api/appointments/me/:id
// @desc    Patient can cancel their OWN appointment
// @access  Private (Patient - own appointments only)
router.delete('/appointments/me/:id', protect, asyncHandler(async (req, res) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id: req.params.id, patientId: req.user.id }
  });
  if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found or not yours.' });
  
  await prisma.appointment.delete({
    where: { id: req.params.id }
  });
  res.status(200).json({ success: true, message: 'Appointment cancelled' });
}));

// ===================== CONTACTS =====================

// @route   POST /api/contact
// @desc    Submit a contact message (Public)
// @access  Public
router.post('/contact', formLimiter, validateRequest(contactSchema), asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const newContact = await prisma.contact.create({
    data: { name, email, subject, message }
  });
  res.status(201).json({ success: true, message: 'Message sent successfully', data: { ...newContact, _id: newContact.id } });
}));

// @route   GET /api/contact
// @desc    Get all contact messages (Admin only)
// @access  Private (Admin)
router.get('/contact', protect, adminOnly, asyncHandler(async (req, res) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  });
  const mappedContacts = contacts.map(c => ({ ...c, _id: c.id }));
  res.status(200).json({ success: true, data: mappedContacts });
}));

module.exports = router;
