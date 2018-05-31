var express = require('express');
var router = express.Router();
var passport = require('passport');
var {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

const User = require('../models/user.js');


router.get('/', ensureLoggedIn('/login'), (req, res) => {
    var userId = req.user._id;

    res.render('profile', {
        user: req.user,
    });
});

module.exports = router;