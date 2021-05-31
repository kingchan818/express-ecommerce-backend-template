const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Cart } = require('../models/cartItems');
const { User } = require('../models/users');
const { Product } = require('../models/products');
const asyncMiddleware = require('../middleware/async');
const { forEach } = require('lodash');

router.get(
    '/',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(400).send('please login in first');
        const result = await Cart.findOne({
            user: {
                _id: token.id,
            },
        });

        if (!result) return res.status(400).send('there is not result');
        res.send(result);
    })
);
// create Cart
router.post('/', async (req, res) => {
    const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
    if (!token) return res.status(400).send('please login in first');
    console.log(token.username);
    console.log(token._id);
    console.log(req.body.product, req.body.quanity);
    await addProduct(token, req.body.product, req.body.quanity);
});

async function addProduct(user, product) {
    let cart = await Cart.findOne({ 'user._id': user._id });

    if (!cart) {
        cart = new Cart({
            user,
            products: product,
        });
        const result = await cart.save();
        console.log(result);
    }
}

//update carts
router.put(
    '/add_Product',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(400).send('please login in first');

        const cartItems = await Cart.findOne({
            user: {
                _id: token.id,
            },
        });

        if (!cartItems) return res.status(400).send('there are no items in your cart');

        const cartItem_array = cartItems.products;

        const product_obj = await Product.findById(req.body.id);

        if (!product_obj) return res.status(400).send('there is added product');
        cartItem_array.push(product_obj);

        cartItems.products = cartItem_array;
        await cartItems.save();
        res.send(cartItems);
    })
);

// detele_cartItems
router.put(
    '/delete_cartItem',
    asyncMiddleware(async (req, res) => {
        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(400).send('please login in first');

        const cart = await Cart.findOne({
            user: {
                _id: token._id,
            },
        });

        const delete_target = req.body.id;
        const productArray = cart.products;

        for (i = 0; i < productArray.length; i++) {
            if (productArray[i]._id === delete_target) {
                productArray.splice(i);
            }
        }
        cart.products = productArray;
        await cart.save();
        res.send(cart);
    })
);

module.exports = router;
