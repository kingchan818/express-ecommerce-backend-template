const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//modules
const { Order } = require('../models/orders');
const { User } = require('../models/users');
const { Product, productsValidtor } = require('../models/products');
const asyncMiddleware = require('../middleware/async');

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(500).send('access denided please login');
        const orders = await Order.find({ user: { _id: token._id } });
        if (orders.length === 0) return res.send('there is no order yet');
        res.send(orders);
    })
);

module.exports = router;
