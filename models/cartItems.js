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
    quanity: {
        type: Number,
        min: 1,
        max: 10000,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

function cartItemValidator(cartItem) {
    const schema = Joi.object({
        quanity: Joi.number().min(1).max(10000).required(),
    });
    return schema.validate(CartItem);
}

exports.CartItem = CartItem;
exports.validator = cartItemValidator;
exports.cartItemSchema = cartItemSchema;
