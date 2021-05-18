const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const vertifiyIsAdmin = (req, res, next) => {
    const token = jwt.verify(req.header('x-auth-token'), process.env.JWT_PRIVATE_KEY);
    if (!token) return res.status(404).send('Please sign in ');
    if (token.isAdmin) return next();
    res.status(403).send('Forbidden');
};

exports.isAdmin = vertifiyIsAdmin;
