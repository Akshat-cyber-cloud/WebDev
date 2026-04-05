import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected");
    }catch(error){
        console.log("Connection Failed");
        console.error(error);
    }
}

export default connectDB;