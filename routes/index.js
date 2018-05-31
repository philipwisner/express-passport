var express = require('express');
var router = express.Router();
var passport = require('passport');
var { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//get home page
router.get('/', ensureLoggedOut('/index'), function (req, res, next) {
  res.render('index', {
    title: 'Encompass'
  });
});


module.exports = router;