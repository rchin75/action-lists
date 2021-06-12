const path = require('path');
const {start} = require('simple-server/start');

const args = process.argv.slice(2);
const appPath = path.join(__dirname, '../index');

start(args, appPath);