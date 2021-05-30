const product = require('../routes/product');
const admin = require('../routes/admin');
const auth = require('../routes/auth');
const user = require('../routes/customer');
const order = require('../routes/order');
const cart = require('../routes/cart');
const error = require('../middleware/error');
const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/products', product);
    app.use('/api/cart', cart);
    app.use('/api/user', user);
    app.use('/api/order', order);
    app.use('/api/auth', auth);
    app.use('/api/admin', admin);
    app.use(error);
};
