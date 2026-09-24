import express from 'express';

import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);

router.get('/my/:patientId', getMyOrders);

router.get('/all', getAllOrders);

export default router;