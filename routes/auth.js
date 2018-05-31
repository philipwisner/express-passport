var express = require('express');
var router = express.Router();
var passport = require('passport');
var { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var User = require("../models/user");

// Bcrypt to encrypt passwords
var bcrypt = require("bcrypt");
var bcryptSalt = 10;


//signIn
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/login',
  passReqToCallback: true
}));

//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));


//FACEBOOK AUTH ROUTE
router.get("/auth/facebook", passport.authenticate("facebook", {
  scope: 'email'
}));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}));


//GOOGLE AUTH ROUTE
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/profile",
    failureRedirect: "/login"
}));

router.get('/logout', ensureLoggedIn('/'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;