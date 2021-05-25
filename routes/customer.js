const { Product, productsValidtor } = require('../models/products');
const { User, userSchema } = require('../models/users');
const asyncMiddleware = require('../middleware/async');

const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

//sign up api
router.post(
    '/',
    asyncMiddleware(async (req, res) => {
        let user = await User.find({ email: req.body.email });
        if (!user) return res.status(400).send('email address is exsiting');
        if (req.body.password1 === req.body.password) {
            user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            const hash = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, hash);
            await user.save();

            const token = user.genJwt();
            res.header('x-auth-token', token).send(token);
        }
        res.send('You are using wrong password');
    })
);

//account page

router.post(
    '/account',
    asyncMiddleware(async (req, res) => {
        throw new Error('asdasd');

        const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
        if (!token) return res.status(500).send('Forbidden');
        const result = await User.findOne({ email: token.email });

        res.send(result);
    })
);

module.exports = router;
