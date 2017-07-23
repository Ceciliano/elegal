var express     = require('express');
var router      = require('./routes/router');
var path        = require('path');
var app         = express();

app.use(router);
app.use(express.static(path.join(__dirname, 'lojas')));

module.exports = app;
