const mongoose = require('mongoose');

function connectDB() {
    console.log("DB ENV:", process.env.MONGO_URI);
    
    mongoose.connect(process.env.MONGO_URI )
    .then(() => {
        console.log("Connected to Database")
    })
}

module.exports = connectDB;