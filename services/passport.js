const passport = require('passport');
const GoogleStratigy = require('passport-google-oauth20').Strategy;
const keys = require('../keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then(user => {
        done(null, user);
    }).catch(err => console.log(err));
});

passport.use(new GoogleStratigy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id});
    if(existingUser){
        return done(null, existingUser);
    }
    const newUser = await new User({googleId: profile.id}).save();
    done(null, newUser);
}));