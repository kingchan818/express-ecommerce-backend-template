const product = require('../routes/product');
const admin = require('../routes/admin');
const auth = require('../routes/auth');
const user = require('../routes/customer');
const error = require('../middleware/error');
const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/products', product);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/admin', admin);
    app.use(error);
};
