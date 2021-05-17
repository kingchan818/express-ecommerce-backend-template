const mongoose = require('mongoose');
const {} = require('./products');
const { userSchema } = require('./users');
const { productSchema } = require('./products');

const orderSchema = new mongoose.Schema({
    timeCreated: {
        type: Date,
        default: Date.now,
    },
    product: {
        type: productSchema,
        require: true,
    },
    user: {
        type: userSchema,
        require: true,
    },
});

mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
