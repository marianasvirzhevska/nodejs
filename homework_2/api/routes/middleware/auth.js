const jwt = require('jsonwebtoken');
const secret = require('../../config/auth').secret;

module.exports = (req, res, next) => {
    const reqHeaders = req.headers['authorization'];

    if (!Boolean(reqHeaders)) {
        next();
    } else {
        // JWT auiwgwjhfgioajoij
        const [token_type, jwt_token] = reqHeaders.split(' ');

        req.user = jwt.verify(jwt_token, secret);

        next();
    }

};