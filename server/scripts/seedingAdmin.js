// scripts/createSuperAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const exists = await User.findOne({ email: 'admin@gmail.com' });
  if (exists) {
    console.log('Admin already exists');
    process.exit();
  }

  await User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456', 
    role: 'admin',
  });

  console.log('Admin created');
  process.exit();
};

createAdmin();
