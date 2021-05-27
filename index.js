const express = require('express');

const winston = require('winston');
const app = express();

//export module
const { logger } = require('./start/logger');
require('./start/database')(logger);
require('./start/routes')(app);

app.listen(5000, () => {
    logger.info('server start......');
});
