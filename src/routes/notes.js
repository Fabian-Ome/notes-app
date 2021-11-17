const router = require('express').Router();
const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
})

router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'please write a Title' });
    }
    if (!description) {
        errors.push({ text: 'please write a Description' });
    }
    if (errors.length > 0) {
        console.log('aqui no debo estar');
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else {
        const newNote = new Note({ title, description });
        await newNote.save();
        res.redirect('/notes');
    }
})

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({ date: 'desc' });
    res.render('notes/all-notes', { notes });
    console.log(notes);
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });

});

module.exports = router;