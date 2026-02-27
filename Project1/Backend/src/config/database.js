const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected To DB")
    })
    .catch((err) => {
        console.log("Failed to Connect DB")
    });
}

module.exports = connectDB;