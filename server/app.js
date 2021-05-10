const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const numbers = require('./routes/numbers');
const results = require('./routes/results');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/', index);
app.use('/api/v1/numbers', numbers);
app.use('/api/v1/results', results);

module.exports = app;