require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const {config} = require('./config');

const {passport, isLoggedIn, getUser} = require('./authentication');

app.use(express.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication actions.
app.post('/api/login',
    passport.authenticate('local', {  }),
    function(req, res) {
        res.json({user: req.user});
    }
);

app.post('/api/logout', function(req, res){
    req.logout();
    res.json({user: null});
});

app.get('/api/user', isLoggedIn, getUser);

// File actions.
// To Do

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(config.port, () => console.log('Server listening on port ' + config.port + '!'));