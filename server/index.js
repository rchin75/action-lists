const {createApp, getConfig, isLoggedIn} = require('simple-server');
const {readFile} = require('./accessSpreadSheet');
const {getMenu} = require('./getMenu');

const config = getConfig();
const app = createApp();

// Configure API routes here.
app.get('/api/readFile', isLoggedIn, readFile);
app.get('/api/getMenu', isLoggedIn, getMenu);

// Start the server.
app.listen(config.port, () => console.log('Server listening on port ' + config.port + '!'));