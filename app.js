var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

//PASSPORT FILE
var configure = require('./config/passport');

//ROUTES
var index = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

mongoose.connect('mongodb://localhost:27017/passport');

app.use(session({
  secret: 'passport-app',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


configure(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

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
