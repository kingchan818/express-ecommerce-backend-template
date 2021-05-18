const express = require('express');
const { Product, productsValidtor } = require('../models/products');
const router = express.Router();



router.get('/', async (req, res) => {
    const products = await Product.find().select('-comment');
    if (!products) return res.status(400).send('There is no product yet');
    res.send(products);
});

module.exports = router;
