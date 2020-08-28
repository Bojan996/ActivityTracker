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
require('./models/toDo');

//Passport setup
require('./services/passport');
require('./routes/authRoutes')(app);

//Task routes
require('./routes/taskRoutes')(app);

app.listen(PORT, () => {
    console.log('Todo working!');
});
