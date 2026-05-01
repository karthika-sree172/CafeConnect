const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a menu item name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [1, 'Price must be greater than 0']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['coffee', 'tea', 'dessert', 'snack', 'beverage']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Cafe+Item'
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);