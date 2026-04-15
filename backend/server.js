require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Models imported inside routes when using mongoose, but connecting DB here.
connectDB().then(async () => {
  // Bootstrap default admin
  const adminExists = await User.findOne({ email: 'admin@ilkosame.com' });
  if (!adminExists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'System Admin',
      email: 'admin@ilkosame.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Default Admin Bootstrap: admin@ilkosame.com / admin123');
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Ilko-same API Backend! (MongoDB version)');
});

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
