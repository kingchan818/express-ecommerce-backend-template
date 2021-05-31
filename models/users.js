const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const { productSchema } = require('./products');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        minlength: 10,
        maxlength: 1024,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 250,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
});
userSchema.methods.genJwt = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin, email: this.email, username: this.username },
        process.env.JWT_PRIVATE_KEY
    );
    return token;
};

const User = mongoose.model('User', userSchema);

function usersVaildator(user) {
    const schmea = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(250).required(),
        password: Joi.string().min(5).max(50).required(),
    });
    return schmea.validate(user);
}

function pwVaildator(user) {
    const schema = Joi.object({
        password: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(user);
}

exports.usersVaildator = usersVaildator;
exports.userSchema = userSchema;
exports.User = User;
exports.pwVaildator = pwVaildator;
