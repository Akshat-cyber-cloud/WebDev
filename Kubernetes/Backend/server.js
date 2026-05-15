const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    let sum = 0;
    for(let i = 0; i < 1e9; i++){
        sum += i;
    }
    res.send(`Sum is ${sum}`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
