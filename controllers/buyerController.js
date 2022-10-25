const Buy = require('../models/buyHistSchema');
const Kyc = require('../models/kycSchema');
const dotenv = require('dotenv').config();
const PUBLISHABLE_KEY=process.env.PUBLISHABLE_KEY;
const SECRET_KEY=process.env.SECRET_KEY;
const stripe=require('stripe')(SECRET_KEY);
const Auction = require('../models/auctionSchema');
const Pay = require('../models/donateSchema');
const Issue = require('../models/issueSchema');
const success = process.env.SUCCESS;

const buyer_dashboard = (req,res)=>{
    try{
            const user = req.user;
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const profile = async(req,res)=>{
    try{
        const user = req.user;
        const data = await Kyc.findOne({email:user.email, userType:"buyer"});
        res.status(200).send(data, user);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const history = async(req,res)=>{
    try{
        const user = req.user;
        const msg = process.env.NODATA;
        const result = await Buy.findOne({email:user.email});
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
        const data = await Kyc.findOne({email:user, userType:"buyer"}).exec();
        if(!data)
            res.redirect('/buyer/no_kyc');
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
            userType: "buyer"
        });
        const result = await kyc.save();
        res.status(200).send(success);
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

const returnItem = async(req,res)=>{
    try{
        const user = req.user;
        const result = await Buy.find({email:user.email, return:{$gte: new Date(Date.now())}});
        res.status(200).send(success,result);
}
catch(err){
    res.status(400).send(err);
}
};
const createReturn = async(req,res)=>{
    try{
        const user = req.user;
        const avatar = req.file.filename;
        const data = req.body.description;
        const id = req.query.id;
        const result = await Buy.findByIdAndUpdate(id,{avatar,remark:data, status:"applied for return"});
        res.status(200).send(success, result);
}
catch(err){
    res.status(400).send(err);
}
};
const listReturn = async(req,res)=>{
    try{
        const user = req.user;
        const result = await Buy.find({email:user.email, status:"applied for return"});
        const rst = await Buy.find({email:user.email, status:"returned"});
        res.status(200).send(success,result,rst);
}
catch(err){
    res.status(400).send(err);
}
};
const donate = (req,res)=>{
    try{
        const key = PUBLISHABLE_KEY;
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
            role:"buyer",
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
            role:"buyer",
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

module.exports = {
    buyer_dashboard,
    profile,
    history,
    noKyc,
    listKyc,
    createKyc,
    auction,
    donate,
    donation,
    returnItem,
    createReturn,
    listReturn,
    issue,
    issueReso

}