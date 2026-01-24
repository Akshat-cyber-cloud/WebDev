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

// Delete Notes
// params -> /notes/:index need to to delete

app.delete('/notes/:index',(req,res) => {
    delete notes[req.params.index]
    res.send("Deleted Sucessfully");
})


// PATCH /notes/:index
// req.body = {description :- "modify desc."}

app.patch("/notes/:index", (req,res) =>{
    notes[ req.params.index ].description = req.body.description
    res.send("Note Updated successfully");
})



module.exports = app;