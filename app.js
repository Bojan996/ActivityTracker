const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const keys = require('./keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

//body-parser config
app.use(bodyParser.json());

//cookie-session config
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//passport-app config
app.use(passport.initialize());
app.use(passport.session());

//DB config
require('./services/mongoose');
require('./models/users');

//Passport setup
require('./services/passport');
require('./routes/authRoutes')(app);


app.get('/user', (req, res) => {
    res.send('Hello there id number: ' + req.user.id);
});

app.get('/', (req, res) => {
    res.send('Hello there!');
});


app.listen(PORT, () => {
    console.log('Todo working!');
});
