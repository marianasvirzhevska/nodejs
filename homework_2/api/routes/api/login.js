const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const secret = require('../../config/auth').secret;

const { users } = require('../../users');

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    let user = users.find(user => user.username === username);

    if (!user){
        res.status(401).json({status: 'User not found'});
    }

    if (!(user.password === password)){
        res.status(401).json({status: 'Wrong password'})
    }

    let jwt_token = jwt.sign(user, secret);
    res.json({jwt_token});
});

module.exports = router;