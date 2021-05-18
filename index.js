const express = require('express');
const mongoose = require('mongoose');
const app = express();

//export module
const product = require('./routes/product');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const user = require('./routes/customer');

mongoose
    .connect('mongodb://localhost/more_proshop')
    .then(() => console.log('connected to db....'))
    .catch((e) => console(e.message));

app.use(express.json());
app.use('/api/products', product);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.listen(5000, () => {
    console.log('server start......');
});
