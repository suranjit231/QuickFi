import mongoose from "mongoose";


const connectMongodb = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/QUICKFI`);
        console.log("MongoDB connected successfully!");

    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
};

export default connectMongodb;