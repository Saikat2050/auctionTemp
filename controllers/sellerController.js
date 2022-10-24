const Sell = require('../models/sellHistorySchema');
const Item = require('../models/itemSchema');
const Auction = require('../models/auctionSchema');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Kyc = require('../models/kyc');
const Bank = require('../models/bankSchema');
const Pay = require('../models/donateSchema');
const Issue = require('../models/issueSchema');
const PUBLISHABLE_KEY=process.env.PUBLISHABLE_KEY;
const SECRET_KEY=process.env.SECRET_KEY;
const stripe=require('stripe')(SECRET_KEY);
//const {sellerOauth} = require('../config/keys');
const secret = process.env.SECRECT;
const success = process.env.SUCCESS;
const notAuth = process.env.NOTAUTH;

const seller_dashboard = async(req,res)=>{
    try{
            const user = req.user;
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
/*const seller_auth = async(req,res)=>{
    try{
        const result = await passport.authenticate('google', { scope: ['profile'] });
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const sellAuth = (req,res)=>{
    try{
        passport.authenticate('google', { failureRedirect: '/seller_login' }),
        (req, res)=> {
          // Successful authentication, redirect home.
          res.redirect('/');
    }
    }
    catch(err) {
        res.status(400).send(err);
    }
};*/
const history = async(req,res)=>{
    try{
        const user = req.user;
        const msg = process.env.NODATA;
        const result = await Sell.findOne({email:user.email});
        if(!result)
            res.status(200).send(msg);
        else
            res.status(200).send(result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const new_item = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const newItem = async(req,res)=>{
    try{
        const user = req.user;
        const data = req.body;
        data.email = user.email;
        const item = new Item(data);
        const result = await item.save();
        res.status(201).send(result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listItems = async(req,res)=>{
    try{
        const user = req.user;
        const msg = process.env.NODATA;
        const result = await Item.findOne({email:user.email});
        if(!result)
            res.status(200).send(msg);
        else
            res.status(200).send(result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const auction = async(req,res)=>{
    try{
        const user = req.user;
        const msg = process.env.NODATA;
        const result = await Auction.find().sort({date: -1});
        if(!result)
            res.status(200).send(msg);
        else
            res.status(200).send(result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const noKyc = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listKyc = async(req,res)=>{
    try{
        const user = req.user.email;
        const data = await Kyc.findOne({email:user, userType:"seller"});
        if(!data)
            res.redirect('/seller/no_kyc');
        else
            res.status(200).send(data);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const createKyc = async(req,res)=>{
    try{
        const avatar = req.file.filename;
        const user = req.user;
        const data = req.body;
        const kyc = new Kyc({
            email: user.email,
            document: data.document,
            number: data.number,
            avatar,
            userType: "seller"
        });
        const result = await kyc.save();
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const noBank = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listBank = async(req,res)=>{
    try{
        const user = req.user.email;
        const data = await Bank.findOne({email:user});
        if(!data)
            res.redirect('/seller/no_bank');
        else
            res.status(200).send(data);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const createBank = async(req,res)=>{
    try{
        const avatar = req.file.filename;
        const user = req.user;
        const data = req.body;
        const bank = new Bank({
            email: user.email,
            bankName: data.bankName,
            account: data.account,
            avatar,
            ifsc: data.ifsc,
            branch: data.branch,
        });
        const result = await kyc.save();
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const profile = async(req,res)=>{
    try{
        const user = req.user;
        const data = await Kyc.findOne({email:user.email});
        res.status(200).send(data, user);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const donate = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const donation = async(req,res)=>{
    try{
        const user = req.user;
        const data = req.body;
        const pay = new Pay({
            email:user.email,
            role:"seller",
            amount:data.amount,
            description:data.description
        });
        const result = await pay.save();
        const customer = await stripe.customers.create({
            email:req.body.stripeEmail,
            source:req.body.stripeToken,
        });
        const charge = await stripe.charges.create({
            amount:data.amount,
            description:data.description,
            currency:'inr',
            customer:customer.id
     });
     const update = await Pay.findByIdAndUpdate(result._id,{status:"Success", remark:"Payment through card"});
    res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const issue = (req,res)=>{
    try{
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const issueReso = async(req,res)=>{
    try{
        const user = req.user;
        const data = req.body;
        const issue = new Issue({
            email:user.email,
            role:"seller",
            issue:data.issue,
            description:data.description
        });
        const result = await issue.save();
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};

module.exports={
    seller_dashboard,
    history,
    new_item,
    newItem,
    listItems,
    auction,
    noKyc,
    listKyc,
    createKyc,
    noBank,
    listBank,
    createBank,
    profile,
    donate,
    donation,
    issue,
    issueReso
}