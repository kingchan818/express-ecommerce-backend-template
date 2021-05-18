const { Product, productsValidtor } = require('../models/products');
const { User, userSchema } = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
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
});

module.exports = router;
