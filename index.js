const express = require('express');
const router = require('./routes/routers');
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
  
 
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  


//app.set('view engine', 'ejs');

app.use(router);

app.listen(port);