
import express from 'express';

import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  getDoctorReports,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Book a new appointment
router.post('/book', bookAppointment);

// Get appointments for a specific patient
router.get('/my/:patientId', getMyAppointments);

// Get all appointments (admin)
router.get('/all', getAllAppointments);

// Get doctor-wise reports (admin)
router.get('/reports/doctors', getDoctorReports);

// Update appointment status
router.put('/status/:id', updateAppointmentStatus);

export default router;
