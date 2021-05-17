const express = require('express');
const mongoose = require('mongoose');
const app = express();

//export module
const product = require('./routes/product');

mongoose
    .connect('mongodb://localhost/more_proshop')
    .then(() => console.log('connected to db....'))
    .catch((e) => console(e.message));

app.use(express.json());
app.use('/api/products', product);

app.listen(5000, () => {
    console.log('server start......');
});
