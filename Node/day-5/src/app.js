const express = require('express');
const app = express();

app.use(express.json());

const notes = [
    {
        title: "Hawk",
        description: "Sharp Eyes" 
    }
];

app.post('/notes', (req, res) => {
    notes.push(req.body);   

    res.status(201).json({
        message: "Note Created Sucessfully"
    })
});

app.get('/notes',(req,res) => {
    res.status(200).json({
        message: "Sucessfully Fetched",
        notes:notes
    })
})

app.delete('/notes/:index', (req,res) => {
    delete notes[req.params.index];

    res.status(204).json({
        message: "Note Deleted Successfully"
    })
})

app.patch("/notes/:index", (req,res) => {
    notes[req.params.index].description = req.body.description;

    res.status(200).json({
        message: "Successfully Updated"
    })
})




module.exports = app;