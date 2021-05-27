const express = require('express');

const winston = require('winston');
const app = express();

//export module
const { log } = require('./start/logger');
require('./start/database')(log);
require('./start/routes')(app);

app.listen(5000, () => {
    log.info('server start......');
});
