const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Note = new mongoose.model('Note', noteSchema)

module.exports = Note