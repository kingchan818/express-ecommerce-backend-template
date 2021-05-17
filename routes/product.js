const express = require('express');
const { Product, productsValidtor } = require('../models/products');
const router = express.Router();

router.post('/', async (req, res) => {
    const error = productsValidtor(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });
    product.save();
    res.send(product);
});

router.get('/', async (req, res) => {
    const products = await Product.find().select('-comment');
    if (!products) return res.status(400).send('There is no product yet');
    res.send(products);
});

module.exports = router;
