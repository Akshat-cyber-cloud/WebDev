const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

let cart = [];

app.post('/api/cart', (req,res) => {
    const item = req.body.item;
    cart.push(item);
    res.json({cart});
});

app.get('/api/cart', (req,res) => {
    res.json({cart});
});



module.exports = app;