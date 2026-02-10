const express = require("express");
const app = express();


app.get("/api/test", (req,res) => {
    // res.send("Data Fetched Properly");

    res.status(200).json({
        message: "All Set To GO",
        user: {
            username: "Test_name",
            email: "test@gmail.com",
            name: "Test"
        }
    })
})



module.exports = app;