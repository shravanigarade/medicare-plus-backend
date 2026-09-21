import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users Error:', error);

    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Get Appointments Error:', error);

    res.status(500).json({
      message: 'Failed to fetch appointments',
      error: error.message,
    });
  }
};