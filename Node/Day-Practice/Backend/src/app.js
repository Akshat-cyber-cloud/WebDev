const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));


app.get("/api/test", (req,res) => {

    res.status(200).json({
        message: "All Set To GO",
        user: {
            username: "Test_name",
            email: "test@gmail.com",
            name: "Test"
        }
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});




module.exports = app;