const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

const User = require('../models/user.js');


router.get('/', ensureLoggedIn('/login'), (req, res) => {
    const userId = req.user._id;

    res.render('profile', {
        user: req.user,
    });
});

module.exports = router;