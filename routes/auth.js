const { Product, productsValidtor } = require('../models/products');
const { User, userSchema } = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('Forbidden');
    const isVaildpassword = await bcrypt.compare(req.body.password, user.password);
    if (!isVaildpassword) return res.status(403).send('Forbidden');

    const token = user.genJwt();

    res.header('x-auth-token', token).send(token);
});

module.exports = router;
