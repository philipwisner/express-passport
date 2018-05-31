const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//PASSPORT FILE
const configure = require('./config/passport');

//CREATE APP
const app = express();

//MONGO SETUP
mongoose.connect('mongodb://localhost:27017/passport');

app.use(session({
  secret: 'passport-app',
  resave: true,
  saveUninitialized: true,
}));


//VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);


//PASSPORT
configure(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//AUTHENTICATION
app.use((req, res, next) => {
  if (typeof (req.user) !== "undefined") {
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});


//ROUTES
const index = require('./routes/index');
const auth = require('./routes/auth');
const profile = require('./routes/profile');

app.use('/', index);
app.use('/', auth);
app.use('/profile', profile)


//ERROR HANDLING
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
