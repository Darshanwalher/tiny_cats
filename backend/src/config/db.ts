import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.log(`error in connecting DB ${error}`);
    }
}

export default connectDB;