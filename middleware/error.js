const { logger } = require('../start/logger');

module.exports = (error, req, res, next) => {
    logger.error(error.message, error);
    res.status(400).send('something run wrong');
    next();
};
