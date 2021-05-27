const { Product, productsValidtor } = require('../models/products');
const { User, userSchema } = require('../models/users');
const { isAdmin } = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

const express = require('express');
const router = express.Router();

router.post(
    '/create_product',
    isAdmin,
    asyncMiddleware(async (req, res) => {
        const error = productsValidtor(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
        });
        product.save();
        res.send(product);
    })
);

module.exports = router;
