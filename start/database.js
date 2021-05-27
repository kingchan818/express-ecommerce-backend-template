const mongoose = require('mongoose');

module.exports = (log) => {
    mongoose
        .connect('mongodb://localhost/more_proshop', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => log.info('connected to db....'))
        .catch((e) => log.error(e.message, e));
};
