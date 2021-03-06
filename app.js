var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var indexRouter = require('./app/routes/index.js')
var olympiansRouter = require('./app/routes/api/v1/olympians.js')
var olympianStatsRouter = require('./app/routes/api/v1/olympian_stats.js')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/v1/olympians', olympiansRouter)
app.use('/api/v1/olympian_stats', olympianStatsRouter)

module.exports = app;
