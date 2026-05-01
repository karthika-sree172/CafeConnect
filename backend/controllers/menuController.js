const MenuItem = require('../models/MenuItem');

exports.getAllMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }

    const items = await MenuItem.find(filter);
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error fetching items' });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ message: 'Server error fetching item' });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    // BUG: No validation for required fields
    const item = new MenuItem({
      name: name || 'Unknown Item',
      description: description || 'No description',
      price: price || 0, // BUG: Allows 0 price
      category: category || 'snack',
      image: image || 'https://via.placeholder.com/300x300?text=Item',
      available: available !== undefined ? available : true
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error creating item' });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    let item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Server error updating item' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error deleting item' });
  }
};