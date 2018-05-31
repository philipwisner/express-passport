const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

var User = require("../models/user");
var UserDetails = mongoose.model('userInfo', UserDetail);

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//signIn
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');s
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect: 'index',
  failureRedirect: '/login',
  passReqToCallback: true
}));

//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successReturnToOrRedirect: 'index',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;