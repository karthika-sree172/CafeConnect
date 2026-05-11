const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// BUG INTENTIONAL: Incorrect total calculation
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryInfo } = req.body;

    if (!items || items.length === 0) {
      // BUG: Allows empty cart checkout
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!deliveryInfo || !deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone) {
      // BUG: No proper validation message
      return res.status(400).json({ message: 'Delivery info required' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Item ${item.menuItemId} not found` });
      }

      // BUG: Wrong total calculation - uses item.price instead of menuItem.price
      const itemTotal = item.price * item.quantity; // Should be menuItem.price
      totalAmount += itemTotal;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: item.price, // BUG: Uses provided price instead of actual price
        quantity: item.quantity // BUG: No validation for negative quantity
      });
    }

    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount: totalAmount, // BUG: No rounding, might have decimal issues
      deliveryInfo,
      status: 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// BUG INTENTIONAL: Allows duplicate orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error updating order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItemId')
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error fetching order' });
  }
};