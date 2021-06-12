const {createApp, getConfig} = require('simple-server');

const config = getConfig();
const app = createApp();

// Configure API routes here.

// Start the server.
app.listen(config.port, () => console.log('Server listening on port ' + config.port + '!'));