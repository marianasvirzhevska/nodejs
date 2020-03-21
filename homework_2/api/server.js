const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

const loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/notes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(log);

app.use(loginRouter);

app.use(auth);

app.use(userRouter);

app.listen(port);
