const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRouters');
const sellerRoutes = require('./routes/sellerRouters');
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const error = process.env.NOTFOUND;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

//app.set('view engine', 'ejs');



app.use('/', userRoutes);
app.use('/seller', sellerRoutes);
//app.use('/buyer', sellerRoutes);

app.use('*', (req, res) => {
    res.status(404).send(error);
  });

app.listen(port);