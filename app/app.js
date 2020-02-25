require('newrelic')
var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
var winston = require('./config/winston');
const path = require('path');

const router = express.Router();


var app = express();

const port= 3030;

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.status(200).send(req.originalUrl)
});

app.get('/',function(req,res) {
    res.sendFile('index.html');
});


app.listen(port, () => {
    console.info('listening on port: ' + port);
});

module.exports = app;
