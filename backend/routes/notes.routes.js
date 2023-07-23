const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/notes.models')
const { body, validationResult } = require('express-validator')

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title, must be 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { title, description, tag } = req.body

            // Check if notes already exist for the user
            const notesExist = await Notes.findOne({ title: title });
            if (notesExist) {
                return res.status(403).send('Notes already exist!');
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }
)

// Update an existing notes 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // create new object 
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        const note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send('not found')
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        const update = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(update)
    } catch (error) {
        res.status(401).send("Internal Server Error")
    }

})


// Deleting Notes 
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {

        const note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        Notes.findByIdAndDelete(req.params.id)
            .then(() => res.send("Deleted"))
            .catch(error => res.send(error))

    } catch (error) {
        res.status(401).send('Internal Server Error')
    }
})

module.exports = router 