const router = require('express').Router();
const passport = require('passport');

// AUTH LOGIN

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// AUTH LOGOUT
router.get('/logout', (req, res) => {
    // HANDLE WITH PASSPORT
    req.logOut();
    res.redirect('/');
});

// AUTH WITH GOOGLE 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//Callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
    // res.send(req.user);
});

module.exports = router;