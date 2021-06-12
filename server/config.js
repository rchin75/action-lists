/**
 * App configuration.
 * @type {{rootFolder: *}}
 */
module.exports.config = {
    port : process.env.PORT ? parseInt(process.env.PORT) : 3000,
    // Just for testing purposes, do not use in production (create users.json instead):
    username: process.env.USERNAME ? process.env.USERNAME : null,
    password: process.env.PASSWORD ? process.env.PASSWORD : null,
};
