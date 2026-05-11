import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    const data = {
        name: 'John Doe',
        age: 30,
        city: 'New York'
    };
    res.json(data);
});

export default app;