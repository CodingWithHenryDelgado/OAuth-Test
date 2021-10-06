const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done ) =>  {
        //Check if user already exists in our db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                //Found User
                console.log("Welcome back " + currentUser);
                done(null, currentUser);
            }else {
                //Welcome new user
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('new user created: ', newUser);
                    done(null, newUser);
                });
            }
        });

    })
);