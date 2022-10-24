const Seller = require('../models/sellerSchema');
const Regis = require('../models/buyerSchema');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRECT;
const notAuth = process.env.NOTAUTH;

const sellerAuth = async(req,res,next)=>{
    const authUser = (req.cookies.authToken);
        if(!authUser)
           return res.status(401).send(notAuth);
        const decoded = await jwt.verify(authUser, secret);
        if(!decoded)
            return res.status(401).send(notAuth);
        const result =await Seller.findById(decoded.data);
        req.user = result;
        return next();
};
const buyerAuth = async(req,res,next)=>{
    const authUser = (req.cookies.authToken);
        if(!authUser)
           return res.status(401).send(notAuth);
        const decoded = await jwt.verify(authUser, secret);
        if(!decoded)
            return res.status(401).send(notAuth);
        const result =await Regis.findById(decoded.data);
        req.user = result;
        return next();
};

module.exports={
    sellerAuth,
    buyerAuth
}