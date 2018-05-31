const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

//get home page
router.get('/', ensureLoggedOut('/index'), function (req, res, next) {
  res.render('index', {
    title: 'Encompass'
  });
});

//home to main search
router.get('/index', (req, res) => {
  res.render('index', {
    message: req.flash("error"),
    user: req.user
  });
});



module.exports = router;