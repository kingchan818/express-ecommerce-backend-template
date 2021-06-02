const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//modules
const { Order } = require('../models/orders');
const { User } = require('../models/users');
const { Cart } = require('../models/cartItems');
const { Product, productsValidtor } = require('../models/products');
const asyncMiddleware = require('../middleware/async');

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(500).send('access denided please login');
        const orders = await Order.find({
            'user.id': token._id,
        });
        if (orders.length === 0) return res.send('there is no order yet');
        res.send(orders);
    })
);

//adding orders
router.post(
    '/',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(500).send('access denided please login');

        const cart = await Cart.findOne({ 'user._id': token._id });
        if (!cart) return res.status(400).send(' you have to add something to the cart before order');
        const order = new Order({
            cart: cart,
        });
        await order.save();
        await Cart.update({ 'user._id': token._id }, { $set: { products: [] } });
        res.send(`cart: ${cart} and order:${order}`);
    })
);

module.exports = router;
