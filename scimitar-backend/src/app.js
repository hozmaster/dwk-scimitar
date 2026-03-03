const express = require('express');
const app = express();

app.use('/', require('./routes/pongs'));

module.exports = app;