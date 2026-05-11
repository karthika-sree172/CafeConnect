const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const seedDatabase = require('./seeds/seedData');

dotenv.config();

// Connect to database and seed
const connectAndSeed = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

connectAndSeed();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running ✓' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ CafeConnect Backend running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});