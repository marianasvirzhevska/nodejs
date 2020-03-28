const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const secret = require('../../config/auth').secret;

const { users } = require('../../users');

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    let user = users.find(user => user.email === email);

    if (!user){
        res.status(401).json({status: 'User not found'});
        res.end();
    } else if (user.password === password){
        let jwt_token = jwt.sign(user, secret);
        res.json({jwt_token});
    } else {
        res.status(401).json({status: 'Wrong password'})
    }

    res.end();
});

module.exports = router;