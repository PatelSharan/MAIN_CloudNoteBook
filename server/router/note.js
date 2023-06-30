const express = require('express')
const router = express.Router()
const Note = require('../models/note.js')
const fetchuser = require('../middelwares/fetchuser.js')



router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const findNotes = await Note.find({ user: req.userId })
        res.send(findNotes)
    } catch (error) {
        res.send('Cannot fetch Notes!')
    }
})


router.post('/addnote', fetchuser, async (req, res) => {
    try {
        const { title, body } = req.body
        const newNote = await new Note({
            title, body, user: req.userId
        })
        const result = await newNote.save()
        res.send(newNote)
    } catch (error) {
        res.status(422).send('Cannot Add Note')
    }
})

router.put('/updatenote/:id', async (req, res) => {
    try {
        let id = req.params.id
        let findNoteById = await Note.findById(id)
        if (!findNoteById) {
            return res.status(404).json('Item not found');
        }
        else {
            findNoteById.title = req.body.title
            findNoteById.body = req.body.body

            const result = await findNoteById.save()
            res.json(result);
        }
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