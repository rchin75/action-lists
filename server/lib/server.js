require('dotenv').config();
const express = require('express');
const path = require('path');
const {passport, isLoggedIn, getUser} = require('./authentication');
const {config} = require('./config');

module.exports.createApp = function() {
    const app = express();

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
    app.use(express.static(path.join(__dirname, '../dist')));

    //app.listen(config.port, () => console.log('Server listening on port ' + config.port + '!'));
    return app;
}

/**
 * Gets the config parameters.
 * @return {{rootFolder: *}}
 */
module.exports.getConfig = function () {
    return config;
}

// Expose these functions:
module.exports.isLoggedIn = isLoggedIn;
module.exports.getUser = getUser;