import express from 'express';
import {
  getMenuItems,
  searchMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} from '../controllers/menuController.js';

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(createMenuItem);

router.route('/search')
  .get(searchMenuItems);

router.route('/:id')
  .get(getMenuItem)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

router.route('/:id/availability')
  .patch(toggleAvailability);

export default router;
