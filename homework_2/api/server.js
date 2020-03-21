const express = require('express');
const app = express();

const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

const loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/notes');

app.use(express.json());
app.use(log);

app.use(loginRouter);

app.use(auth);

app.use(userRouter);

app.listen(3000);
