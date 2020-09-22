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
require('./models/toWatch');
require('./models/toBuy');
require('./models/toTravel');

//Passport setup
require('./services/passport');
require('./routes/authRoutes')(app);

//Task routes
require('./routes/taskRoutes')(app);

//Configurating the production routing environment
if(process.env.NODE_ENV === 'production'){
    //Express will use assets files like main.js or main.css
    app.use(express.static('client/build'));

    //Express will use index.js file if not recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('Todo working!');
});
