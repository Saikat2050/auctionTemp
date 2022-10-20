const Regis = require('../models/buyerSchema');
const Seller = require('../models/sellerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'somereallysecrettoken';
const saltRounds = 10;
const success = 'success';

const dashboard = (req,res)=>{
    try{
        
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyer_login = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyLogin = async (req,res)=>{
    try{
        const msg = 'Register youself first';
        const error = 'Email ID and Password mismatched';
        const email = req.body.email;
        const password = req.body.password;
        const result = await Regis.findOne({email});
        if(!result)
            res.status(401).send(msg);
        else{
        const hash = result.password;
        const verification = await bcrypt.compare(password, hash); 
        if(verification)
            res.status(200).send(success);
        else
            res.status(401).send(error);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const seller_login = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const sellLogin = async (req,res)=>{
    try{
        const msg = 'Register youself first';
        const error = 'Email ID and Password mismatched';
        const email = req.body.email;
        const password = req.body.password;
        const result = await Seller.findOne({email});
        if(!result)
            res.status(401).send(msg);
        else{
        const hash = result.password;
        const verification = await bcrypt.compare(password, hash); 
        if(verification)
            res.status(200).send(success);
        else
            res.status(401).send(error);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyer_register = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyRegistration = async(req,res)=>{
    const msg = 'User already exist';
    const email = req.body.email;
    const result = await Regis.findOne({email});
    if(!result){
        const regis = new Regis(req.body);
        regis.password = await bcrypt.hash(regis.password, saltRounds);
        const data = await regis.save();
        const authId = await Regis.findOne({email});
        const token = jwt.sign({ data: `${authId._id}` }, secret);
        res.cookie(`authToken`,`${token}`).status(200).send(success);
    }
    else 
        res.status(409).send(msg);
};
const seller_register = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const sellRegistration = async(req,res)=>{
    const msg = 'User already exist';
    const email = req.body.email;
    const result = await Seller.findOne({email});
    if(!result){
        const seller = new Seller(req.body);
        seller.password = await bcrypt.hash(seller.password, saltRounds);
        const data = await seller.save();
        const authId = await Seller.findOne({email});
        const token = jwt.sign({ data: `${authId._id}` }, secret);
        res.cookie(`authToken`,`${token}`).status(200).send(success);
    }
    else
        res.status(409).send(msg);
};

module.exports = {
    dashboard,
    buyer_login,
    buyLogin,
    seller_login,
    sellLogin,
    buyer_register,
    buyRegistration,
    seller_register,
    sellRegistration
}