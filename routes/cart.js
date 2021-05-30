const express = require('express');
const router = express.Router();
const { CartItem } = require('../models/cartItems');
const { Product } = require('../models/products');

router.get('/', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) res.status(400).send('please login first');
    const result = await CartItem.findOne({
        user: {
            _id: token.id,
        },
    });

    if (!result) return res.status(400).send('there is not result');
    res.send(result);
});
//add product
router.post('/add_Product', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) res.status(400).send('please login first');

    const cartItems = await CartItem.findOne({
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
});

module.exports = router;
