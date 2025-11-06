import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is not defined in .env");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  console.log("✅ Connected to MongoDB");
  return cached.conn;
};

export default connectToDatabase;
