const mongoose = require('mongoose');

const connectToDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected");
    }catch(error){
        console.error("Connection Failed");
    }
};

module.exports = connectToDB