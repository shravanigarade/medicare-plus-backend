import express from 'express';
import {
  getAllUsers,
  getAllAppointments,
} from '../controllers/adminController.js';

import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Only admin can access these routes
router.get('/users', adminMiddleware, getAllUsers);
router.get('/appointments', adminMiddleware, getAllAppointments);

export default router;