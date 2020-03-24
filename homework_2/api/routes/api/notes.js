const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, '../../', 'notes.json');
const data = fs.readFileSync(filePath);
const json = JSON.parse(data);

// read notes
router.get('/notes', (req, res) => {

    if (!req.user) {
        res.status(401).json({status: 'User not authorized'});
    } else {
        let userNotes = json.notes.filter(note => (note.user === req.user.id));

        res.json({notes: userNotes});
    }
});

//add notes
router.post('/notes', (req, res) => {

    req.body.user = req.user.id;

    json.notes.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(json, null, '    '), (err) => {
        if (err) {
            res.status(500).json({ status: 'Server error. Please try later' });
            throw err;
        }
    });

    res.json({status: 'Note created'});
    res.end();

});

// edit notes
router.put('/notes', (req, res) => {

    const note = json.notes.find(note => note.id === req.body.id);
    let editedNotes = {notes: []};

    if(!note) {
        res.status(500).json({ status: 'Error. No such note.' });
    } else {
        editedNotes.notes = json.notes.map(note => {
            if (note.id === req.body.id) {
                return req.body;
            }
            return {
                ...req.body,
                ...note,
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(editedNotes, null, '    '), (err) => {
            if (err) {
                res.status(500).json({ status: 'Server error. Please try later' });
                throw err;
            }
        });

        res.json({ status: 'Note edited' });
    }

    res.end();

});

//delete note
router.delete('/notes', (req, res) => {
    const noteIndex = json.notes.findIndex(note => note.id === req.body.id);

    json.notes.splice(noteIndex, 1);

    fs.writeFileSync(filePath,  JSON.stringify(json, null, '    '), (err) => {
        if (err) {
            res.status(500).json({status: 'Server error. Please try later'});
            throw err;
        }
    } );

    res.json({status: 'Note deleted'});

});

module.exports = router;