var express = require('express');
var router = express.Router();
var passport = require('passport');
var {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

//home to main search
router.get('/profile', (req, res) => {
    res.render('profile', {
        message: req.flash("error"),
        user: req.user
    });
});



module.exports = router;