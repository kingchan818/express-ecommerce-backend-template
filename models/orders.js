const mongoose = require('mongoose');
const {} = require('./products');
const { userSchema } = require('./users');
const { productSchema } = require('./products');
const { cartItemSchema } = require('./cartItems');

const orderSchema = new mongoose.Schema({
    timeCreated: {
        type: Date,
        default: Date.now,
        required: true,
    },
    cart: {
        type: cartItemSchema,
    },
});

const Order = mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
