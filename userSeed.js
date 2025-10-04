import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  try {
    await connectToDatabase(); // ✅ Wait for DB connection

    // ✅ Optional: Check if user already exists
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("Admin user already exists.");
      await mongoose.disconnect(); // Clean up
      return;
    }

    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log("Admin user created successfully.");

    await mongoose.disconnect(); // ✅ Always disconnect after script ends
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

userRegister();
