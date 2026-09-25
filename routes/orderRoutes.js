import express from 'express';

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);

router.get('/my/:patientId', getMyOrders);

router.get('/all', getAllOrders);

router.put('/status/:id', updateOrderStatus);

export default router;