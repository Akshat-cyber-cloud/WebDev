// Server ko config karna 

const express = require('express');
const app = express();

app.use(express.json());

const notes = [
    {
        title: "test title 1",
        description: "test description 1"
    }
]

app.get('/', (req,res) => {
    res.send("Hello Guys")
})

app.post("/notes", (req,res) => {
    notes.push(req.body);
    res.send("Notes Created");

    console.log(notes);
})

app.get("/notes",(req,res) => {
    res.send(notes);
})


module.exports = app;