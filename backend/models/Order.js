const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
    // BUG INTENTIONAL: No min validation - allows negative totals
  },
  deliveryInfo: {
    name: String,
    address: String,
    phone: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);