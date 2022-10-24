const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const Regis = require('../models/buyerSchema');
const Seller = require('../models/sellerSchema');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const multer  = require('multer');
const maxSize = 2 * 1024 * 1024;

 
/*const sellerOauth = passport.use(new GoogleStrategy({
    clientID:  process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/seller/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    Seller.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
const buyerOauth = passport.use(new GoogleStrategy({
  clientID:  process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: "http://localhost:3000/buyer/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  Regis.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));*/

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.USER,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOKEN,
      accessToken: process.env.ACCESSTOKEN,
      expires: 1484314697598,
    },
  });
  const upload = multer({ dest: '../views/public/uploads/',
limits: { fileSize: maxSize },
fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  } 
});

module.exports = {
    transporter,
    upload
};