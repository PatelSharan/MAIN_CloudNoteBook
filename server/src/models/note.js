const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    //Adding user 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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