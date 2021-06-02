const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./users');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 100000,
    },
    offer: {
        required: true,
        type: Boolean,
        default: false,
    },
    quanity: {
        type: Number,
        min: 1,
        max: 10000,
    },
    storage: {
        type: Number,
        min: 0,
        max: 10000,
        required: true,
    },
    comment: {
        type: String,
        customers: [
            {
                types: userSchema,
                required: true,
            },
        ],
    },
});

productSchema.methods.isAvailable = function () {
    if (this.storage > 0) return true;
    return false;
};
productSchema.methods.minusStorage = function () {
    return this.storage - 1;
};
productSchema.methods.addStorage = function () {
    return this.storage + 1;
};

const Product = mongoose.model('Product', productSchema);
function productsValidtor(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        price: Joi.number().min(0).max(100000).required(),
    });
    return schema.validate(product);
}

exports.productSchema = productSchema;
exports.productsValidtor = productsValidtor;
exports.Product = Product;
