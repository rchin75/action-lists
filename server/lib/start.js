const prompt = require('prompt');
const {addUser} = require('./userManagement');

// Configure Prompt.
const properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }
];
function onErr(err) {
    console.log(err);
    return 1;
}

/**
 * Starts the app using the args.
 * @param args Command line arguments.
 * @param appPath App path.
 */
module.exports.start = function(args, appPath) {
    if (args.length === 0) {
        // node server/bin/main.js
        require(appPath);
    } else {
        switch (args[0]) {
            case '-add-user': {
                // node server/bin/main.js -add-user
                prompt.start();
                prompt.get(properties, function (err, result) {
                    if (err) { return onErr(err); }
                    addUser(result.username, result.password).then(()=> {
                        console.log('User added to users.json.')
                    });
                });
                break;
            }
            default:
                // node server/bin/main.js
                require(appPath);
        }
    }
}

