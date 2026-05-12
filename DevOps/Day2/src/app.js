import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    const data = [{
        name: 'John Doe',
        age: 30,
        city: 'New York'
    }, {
        name: 'Jane Smith',
        age: 25,
        city: 'Los Angeles'
    }];
    res.json(data);
});

export default app;