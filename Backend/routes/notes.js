const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route 1 :- Get all the notes using : GET "/api/notes/fetchallnotes"  -- login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

// Route 2 :- add the notes using : post "api/notes/addnote"  -- login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', "Enter atleast 5 charecter").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are errors , return bad requrest and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {

        console.error(error.message);
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// Route 3 :- update the notes using : put "api/notes/updatenote"  -- login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //creating newNote object
        var newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message);
        // console.log(error);
        res.status(500).send("Internal server error");
    }
})

// Route 4 :- delete the notes using : DELETE "api/notes/deletenote"  -- login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "sucess": "note is deleted", note: note })

    } catch (error) {
        console.error(error.message);
        // console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router