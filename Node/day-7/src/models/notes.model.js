const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

// Schema -  Format of the data
// NoteModel - Without this cant perform any operation 

const noteModel = mongoose.model("NoteV2", noteSchema)

module.exports = noteModel;