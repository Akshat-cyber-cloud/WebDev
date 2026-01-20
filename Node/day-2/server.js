const express = require('express');

const app = express(); // Server Instance Created


app.get('/', (req,res) => {
    res.send("Hello World");
})

app.get('/about', (req,res) => {
    res.send("This is About page");
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})