const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRouters');
const sellerRoutes = require('./routes/sellerRouters');
const buyerRoutes = require('./routes/buyerRouters');
const adminRoutes = require('./routes/adminRouters');
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const error = process.env.NOTFOUND;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(express.static(__dirname+"./public/"));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');



app.use('/', userRoutes);
app.use('/seller', sellerRoutes);
app.use('/buyer', buyerRoutes);
app.use('/admin', adminRoutes);

app.use('*', (req, res) => {
    res.status(404).send(error);
  });

app.listen(port);