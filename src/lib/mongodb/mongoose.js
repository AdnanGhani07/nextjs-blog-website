import mongoose from "mongoose";

let initalized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    if (initalized) return;
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'next-blog',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        initalized = true;
    }catch(error){
        console.log("MongoDB connection error", error);
    }
}
