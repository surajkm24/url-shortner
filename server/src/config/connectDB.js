import mongoose from "mongoose";
import { config } from "dotenv";

export const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URL);
}