const express = require('express');

const router = express.Router();

const { notes } = require('../../notes');

router.get('/notes', (req, res) => {

    if (!req.user) {
        res.status(401).json({status: 'User not authorized'});
    } else {
        let userNotes = notes.filter(note => (note.user === req.user.id));

        if(userNotes.length < 1){
            res.status(200).json({status: 'Notes not found'});
        } else {
            res.json(userNotes);
        }
    }
});

module.exports = router;