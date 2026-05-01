const mongoose = require('mongoose');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      console.log('✓ Database already seeded. Skipping seed.');
      return;
    }

    // Seed Users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@cafeconnect.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'user@cafeconnect.com',
        password: 'user123',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@cafeconnect.com',
        password: 'jane123',
        role: 'user'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✓ ${createdUsers.length} users created`);

    // Seed Menu Items
    const menuItems = [
      {
        name: 'Espresso',
        description: 'Strong, concentrated coffee shot',
        price: 150,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1610885112649-a9d9f4aef58d?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Cappuccino',
        description: 'Creamy coffee with steamed milk',
        price: 200,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Latte',
        description: 'Smooth coffee with lots of milk',
        price: 220,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Americano',
        description: 'Espresso with hot water',
        price: 160,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1610885112649-a9d9f4aef58d?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Green Tea',
        description: 'Fresh green tea',
        price: 120,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1597318972268-1aa3f59e2bfe?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Black Tea',
        description: 'Traditional black tea',
        price: 100,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1597318972268-1aa3f59e2bfe?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Iced Tea',
        description: 'Refreshing iced tea',
        price: 140,
        category: 'beverage',
        image: 'https://images.unsplash.com/photo-1556821552-24e9ebf17e1f?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate layer cake',
        price: 250,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Cheesecake',
        description: 'Creamy cheesecake with berries',
        price: 280,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1589985643989-5e36a5d5c76b?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Croissant',
        description: 'Fresh buttery croissant',
        price: 120,
        category: 'snack',
        image: 'https://images.unsplash.com/photo-1585518419759-1b2b4f2a5b5f?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Brownie',
        description: 'Fudgy chocolate brownie',
        price: 180,
        category: 'snack',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop',
        available: true
      },
      {
        name: 'Muffin',
        description: 'Blueberry muffin',
        price: 150,
        category: 'snack',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop',
        available: true
      }
    ];

    const createdItems = await MenuItem.insertMany(menuItems);
    console.log(`✓ ${createdItems.length} menu items created`);

    console.log('\n✓ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  }
};

module.exports = seedDatabase;