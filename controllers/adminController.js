const Auction = require('../models/auctionSchema');
const Kyc = require('../models/kycSchema');
const Bank = require('../models/bankSchema');
const Buy = require('../models/buyHistSchema');
const Issue = require('../models/issueSchema');
const Pay = require('../models/donateSchema');
const dotenv = require('dotenv').config();
const success = process.env.SUCCESS;

const dashboard = async(req,res)=>{
    try{
            const user = req.user;
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const auctionList = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Auction.find({isDeleted: false, date:{$gte:new Date(Date.now())}}).sort({date: 1});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const create = async(req,res)=>{
    try{
            const user = req.user;
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const createAuction = async(req,res)=>{
    try{
            const user = req.user;
            const data = req.body;
            const auction = new Auction(data);
            const result = await auction.save();
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const deleteAuction = async(req,res)=>{
    try{
            const user = req.user;
            const id = req.query.id;
            const data = await Auction.findByIdAndUpdate(id,{isDeleted: true});
            res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const update = async(req,res)=>{
    try{
            const user = req.user;
            const id= req.query.id;
            const result = await Auction.findById(id);
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const updateAuction = async(req,res)=>{
    try{
        const user = req.user;
        const id = req.query.id;
        const data = req.body;
        const result = await Auction.findByIdAndUpdate(id, data);
        res.status(200).send(success);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listKyc = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Kyc.find({status:"Pending"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listBank = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Bank.find({status:"Pending"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listReturn = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Buy.find({status:"applied for return"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listIssue = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Issue.find().sort({createdAt: -1});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const listDonation = async(req,res)=>{
    try{
            const user = req.user;
            const result = await Pay.find().sort({createdAt: -1});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const approve = async(req,res)=>{
    try{
            const user = req.user;
            const id = req.query.id;
            const dbName = req.query.db;
            const result = await dbName.findByIdAndUpdate(id, {status:"Approve", remark:"Approved"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const reject = async(req,res)=>{
    try{
            const user = req.user;
            const id = req.query.id;
            const dbName = req.query.db;
            const result = await dbName.findByIdAndUpdate(id, {status:"Rejected", remark:"Documents are not proper"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const approveReturn = async(req,res)=>{
    try{
            const user = req.user;
            const id = req.query.id;
            const result = await Buy.findByIdAndUpdate(id, {status:"returned"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};
const rejectReturn = async(req,res)=>{
    try{
            const user = req.user;
            const id = req.query.id;
            const result = await Buy.findByIdAndUpdate(id, {status:"Rejected", remark:"Violation of Return Policy"});
            res.status(200).send(success, result);
    }
    catch(err){
        res.status(400).send(err);
    }
};

module.exports = {
    dashboard,
    auctionList,
    create,
    createAuction,
    deleteAuction,
    update,
    updateAuction,
    listKyc,
    listBank,
    listReturn,
    listIssue,
    listDonation,
    approve,
    reject,
    approveReturn,
    rejectReturn
}