const express = require('express')
const router = express.Router()
const Note = require('../models/note.js')

router.post('/addnote', async (req, res) => {
    try {
        const { title, body } = req.body
        const newNote = await new Note({
            title, body
        })
        const result = await newNote.save()
        res.send(newNote)
    } catch (error) {

    }
})


module.exports = router