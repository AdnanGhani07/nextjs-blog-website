import mongoose from "mongoose";

let initalized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    if (initalized) return;
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'next-blog',
        });
        console.log("Connected to MongoDB successfully");
        initalized = true;
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}
