const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./users');
const { productSchema } = require('./products');

const cartItemSchema = new mongoose.Schema({
    user: {
        type: userSchema,
        required: true,
    },
    products: [
        {
            type: productSchema,
            required: true,
        },
    ],
    timeCreated: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model('Cart', cartItemSchema);

exports.Cart = Cart;
exports.cartItemSchema = cartItemSchema;
