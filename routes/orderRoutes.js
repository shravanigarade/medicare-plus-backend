import express from 'express';
import {
  createOrder,
  getMyOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);

router.get('/my/:patientId', getMyOrders);

export default router;