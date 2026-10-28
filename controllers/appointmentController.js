
import Appointment from '../models/Appointment.js';

// Create new appointment (booking)
export const bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorName,
      specialization,
      appointmentDate,
    } = req.body;

    const newAppointment = new Appointment({
      patientId,
      doctorName,
      specialization,
      appointmentDate,
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get all appointments for a specific patient
export const getMyAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({
      patientId,
    }).sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get ALL appointments (for admin)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update appointment status (for admin)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      message: 'Appointment status updated successfully!',
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get doctor-wise reports
export const getDoctorReports = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    const reports = {};

    appointments.forEach((appointment) => {
      const doctor = appointment.doctorName || 'Unknown Doctor';

      if (!reports[doctor]) {
        reports[doctor] = {
          doctorName: doctor,
          totalAppointments: 0,
          uniquePatients: new Set(),
          completedVisits: 0,
        };
      }

      reports[doctor].totalAppointments += 1;

      if (appointment.patientId) {
        reports[doctor].uniquePatients.add(
          appointment.patientId.toString()
        );
      }

      if (appointment.status === 'completed') {
        reports[doctor].completedVisits += 1;
      }
    });

    const result = Object.values(reports).map((report) => ({
      doctorName: report.doctorName,
      totalAppointments: report.totalAppointments,
      uniquePatients: report.uniquePatients.size,
      completedVisits: report.completedVisits,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to generate doctor reports',
      error: error.message,
    });
  }
};
