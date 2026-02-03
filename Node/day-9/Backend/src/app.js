const express = require('express');
const noteModel = require('./models/note.model')
const cors = require("cors")
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.static("./public"))
app.use(cors());

app.post('/api/notes',async (req,res) => {
    const {title,bio} = req.body;

    const note = await noteModel.create({
        title,bio
    })

    res.status(201).json({
        message: "Created Successfully",
        note
    });
})


app.get("/api/notes", async (req,res) => {

    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes Fetched Successfully",
        notes
    })
})


app.delete('/api/notes/:id', async (req,res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note Deleted Successfully."
    })
})


app.patch('/api/notes/:id', async (req,res) => {
    const id = req.params.id;
    const {bio} = req.body;

    await noteModel.findByIdAndUpdate(id, { bio })

    res.status(200).json({
        message: "Note Updated Successfully"
    })
})

app.use('*name', (req,res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})

module.exports = app;