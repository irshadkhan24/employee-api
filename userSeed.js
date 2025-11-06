import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "./models/User.js"; // Make sure User model exists
import connectToDatabase from "./db/db.js";

dotenv.config();

const userRegister = async () => {
  try {
    await connectToDatabase();

    console.log("Checking existing admin...");
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("⚠️ Admin already exists.");
      return;
    }

    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ Admin user created successfully.");
  } catch (error) {
    console.log("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

userRegister();
