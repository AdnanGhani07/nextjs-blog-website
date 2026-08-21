import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1 || isConnected) {
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'next-blog',
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        isConnected = false;
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
