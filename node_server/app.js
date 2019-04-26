var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser');

var zerorpc = require("zerorpc");
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/music',function (req, res) {
  console.log(req.body.amount);
  client.invoke("start",req.body.amount,function(error, res, more) {
    console.log("lets go");
  });
  res.render('index', { title: 'Pepper page' });
});
app.post('/finish', function (req, res) {
  client.invoke("finish", function(error, res, more) {
    console.log("lets finish the song");
  });
  res.render('index', { title: 'Pepper page' });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',function(req, res, next) {
  res.render('index', { title: 'Pepper page' });
});
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
