require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const prisma = require('./db');
const bcrypt = require('bcryptjs');

// Bootstrap default users
prisma.$connect().then(async () => {
  try {
    // Bootstrap default admin
    const adminEmail = 'admin@ilkosame.com';
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: 'System Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      }
    });
    console.log('✅ Admin account ready: admin@ilkosame.com / admin123');

    // Bootstrap default doctor
    const doctorEmail = 'doctor@ilkosame.com';
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    
    await prisma.user.upsert({
      where: { email: doctorEmail },
      update: {},
      create: {
        name: 'Dr. Ahmed Ali',
        email: doctorEmail,
        password: doctorPassword,
        role: 'doctor'
      }
    });
    console.log('✅ Doctor account ready: doctor@ilkosame.com / doctor123');
  } catch (error) {
    console.error('Bootstrap error:', error);
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
