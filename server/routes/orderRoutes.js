import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getTopSellingItems
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/analytics/top-items')
  .get(getTopSellingItems);

router.route('/:id')
  .get(getOrder);

router.route('/:id/status')
  .patch(updateOrderStatus);

export default router;
