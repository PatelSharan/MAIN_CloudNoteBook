const express = require('express')
const router = express.Router()
const Note = require('../models/note.js')



router.get('/getnotes', async (req, res) => {
    try {
        const findNote = await Note.find()
        res.send(findNote)
    } catch (error) {
        res.send('Cannot fetch Notes!')
    }
})


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

router.put('/updatenote/:id', async (req, res) => {
    try {
        let id = req.params.id
        let findNoteById = await Note.findById(id)
        if (!findNoteById) {
            return res.status(404).json('Item not found');
        }
        findNoteById.title = req.body.title
        findNoteById.body = req.body.body

        const result = await findNoteById.save()
        res.json(result);
    } catch (error) {
        res.send('Cannot Update note')
    }
})

router.delete('/deletenote/:id', async (req, res) => {
    try {

        let id = req.params.id
        let findNoteAndDelete = await Note.findByIdAndDelete(id)
        if (!findNoteAndDelete) {
            return res.status(404).json('Item not found');
        }
        res.send('Note Deleted...');
    } catch (error) {
        res.send('Cannot Update note')
    }
})


module.exports = router