import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

// @desc    Get all orders with pagination
// @route   GET /api/orders
// @access  Public
export const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate('items.menuItem', 'name price category')
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem', 'name price category imageUrl');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    const menuItemIds = items.map(item => item.menuItem);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

    if (menuItems.length !== items.length) {
      return res.status(400).json({
        success: false,
        error: 'One or more menu items not found'
      });
    }

    let totalAmount = 0;

    const orderItems = items.map(item => {
      const menuItem = menuItems.find(
        mi => mi._id.toString() === item.menuItem
      );

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      return {
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price
      };
    });

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      customerName,
      tableNumber
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('items.menuItem', 'name price category');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.menuItem', 'name price category');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get top selling menu items (Aggregation)
// @route   GET /api/orders/analytics/top-items
// @access  Public
export const getTopSellingItems = async (req, res) => {
  try {
    const topItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.menuItem',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: {
            $sum: { $multiply: ['$items.quantity', '$items.price'] }
          }
        }
      },
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: '_id',
          as: 'menuItem'
        }
      },
      { $unwind: '$menuItem' },
      {
        $project: {
          _id: 0,
          menuItemId: '$_id',
          name: '$menuItem.name',
          category: '$menuItem.category',
          price: '$menuItem.price',
          totalQuantity: 1,
          totalRevenue: 1
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: topItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
