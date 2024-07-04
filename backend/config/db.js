import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected');
      }).catch((error) => {
        console.error('Connection error', error);
      });
}

export default connectDB