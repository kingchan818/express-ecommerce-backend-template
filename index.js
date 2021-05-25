const express = require('express');
const mongoose = require('mongoose');
const app = express();

//export module
const product = require('./routes/product');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const user = require('./routes/customer');
const error = require('./middleware/error');

mongoose
    .connect('mongodb://localhost/more_proshop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db....'))
    .catch((e) => console(e.message));

app.use(express.json());
app.use('/api/products', product);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.use(error);

app.listen(5000, () => {
    console.log('server start......');
});
