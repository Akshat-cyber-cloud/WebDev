require('dotenv').config();


const app = require('./src/app');
const mongoose = require('mongoose');
const connect = require('./src/config/database');

connect();

app.listen(3000, () => {
    console.log("Server Running on port 3000");
})