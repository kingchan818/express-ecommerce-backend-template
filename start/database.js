const mongoose = require('mongoose');

module.exports = (logger) => {
    mongoose
        .connect('mongodb://localhost/more_proshop', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info('connected to db....'))
        .catch((e) => logger.error(e.message, e));
};
