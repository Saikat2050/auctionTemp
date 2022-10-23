const Seller = require('../models/sellerSchema');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRECT;
const success = process.env.SUCCESS;
const notAuth = process.env.NOTAUTH;

const seller_dashboard = async(req,res)=>{
    try{
        const authUser = (req.cookies.authToken);
        if(!authUser)
            res.status(400).send(notAuth);
        else{
            const decoded = await jwt.verify(authUser, secret);
        if(!decoded)
            res.status(401).send(notAuth);
        else{
            const result =await Seller.findById(decoded.data);
            res.status(200).send(result.email);
        }
        } 
    }
    catch(err){
        res.status(400).send(err);
    }
};

module.exports={
    seller_dashboard
}