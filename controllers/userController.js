const Regis = require('../models/buyerSchema');
const Seller = require('../models/sellerSchema');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {transporter} = require('../config/keys');
const _ = require('lodash');
const secret = process.env.SECRECT;
const otpSecret = process.env.OTPSECRET;
const saltRounds = 10;
const success = process.env.SUCCESS;


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
        const msg = process.env.REGISTER;
        const errormsg = process.env.NOTVERIFIED;
        const error = process.env.LOGIN;
        const email = req.body.email;
        const password = req.body.password;
        const result = await Regis.findOne({email});
        if(!result)
            res.status(403).send(msg);
        else{
        if(result.isVerified){
        const hash = result.password;
        const verification = await bcrypt.compare(password, hash); 
        if(verification){
            const token = jwt.sign({ data: `${result._id}` }, secret, { expiresIn: '10h' });
            res.cookie(`authToken`,`${token}`).status(200).send(success);
        }
        else
            res.status(403).send(error);
    }
    else
        res.status(403).send(errormsg);
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
        const msg = process.env.REGISTER;
        const errormsg = process.env.NOTVERIFIED;
        const error = process.env.LOGIN;
        const email = req.body.email;
        const password = req.body.password;
        const result = await Seller.findOne({email});
        if(!result)
            res.status(403).send(msg);
        else{
        if(result.isVerified){
        const hash = result.password;
        const verification = await bcrypt.compare(password, hash); 
        if(verification){
            const token =await jwt.sign({ data: `${result._id}` }, secret, { expiresIn: '10h' });
            res.cookie(`authToken`,`${token}`).status(200).send(success);
        }
        else
            res.status(403).send(error);
        }
        else
            res.status(403).send(errormsg);
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
    try{
        const msg = process.env.EXIST;
    const mis = process.env.MISMATCH;
    const email = req.body.email;
    const result = await Regis.findOne({email});
    if(!result){
        if(req.body.password==req.body.confirm){
        const regis = new Regis(req.body);
        regis.password = await bcrypt.hash(regis.password, saltRounds);
       const data = await regis.save();
        res.clearCookie('authToken').status(200).send(success);
        }
        else
            res.status(400).send(mis);
    }
    else 
        res.status(409).send(msg);
    }
    catch (err) {
        res.status(400).send(err);
    }
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
    try{
        const msg = process.env.EXIST;
    const mis = process.env.MISMATCH;
    const email = req.body.email;
    const result = await Seller.findOne({email});
    if(!result){
        if(req.body.password==req.body.confirm){
            const seller = new Seller(req.body);
        seller.password = await bcrypt.hash(seller.password, saltRounds);
        const data = await seller.save();
        res.clearCookie('authToken').status(200).send(success);
    }
    else
        res.status(400).send(mis);
    }
    else
        res.status(409).send(msg);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buy_otp = async(req,res)=>{
    try{
        const msg = process.env.REGISTER;
        const msg2 = process.env.CANLOGIN;
        const id = req.query.id;
        const data = await Regis.findById(id);
        if(!data)
            res.status(409).send(msg);
        else{
            if(data.isVerified)
                res.status(409).send(msg2);
            else{
                const otp =await _.random(100000,999999);
                const otpTok =await jwt.sign({
                    data: `${otp}`
                  }, otpSecret, { expiresIn: '10m' });
                const token =await jwt.sign({
                    data: `${data._id}`
                  }, otpSecret, { expiresIn: '10m' });
                const info = await transporter.sendMail({
                    from: process.env.USER, // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "One Time Password", // Subject line
                    html: `<p>One Time Password for Auction House is ${otp}. Please provide the OTP in the web page or click in the below link</p><br><a href="http://localhost:3000/buyer_otp/?token=${token}">Verify Yourself</a>`, // html body
                  });
                  res.cookie(`otpToken`,`${otpTok}`, {maxAge: 600000}).status(200).send({success, status: info.messageId});
            }
        }
    }
    catch (err){
        res.status(400).send(err);
    }
};
const buyOtp = async(req,res)=>{
    try{
        const error = process.env.FAILED;
        const msg = process.env.VALID;
        const id = req.query.id;
        const verify = req.body.verify;
        const otpTok = req.cookies.otpToken;
        if(!otpTok)
            res.status(400).send(error);
        else{
            const decoded = await jwt.verify(otpTok, otpSecret);
        if(decoded.data==verify){
            const data = await Regis.findByIdAndUpdate(id, {isVerified:true});
            res.clearCookie('otpToken').status(200).send(success);
        }
        else
            res.status(403).send(msg);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyer_otp = async(req,res)=>{
    try{
        const err = process.env.INVALIDTOKEN;
        const token = req.query.token;
        const decoded = await jwt.verify(token, otpSecret);
        const result = await Regis.findByIdAndUpdate(decoded.data, {isVerified:true});
        if(!result)
            res.status(406).send(err);
        else
            res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const sell_otp = async(req,res)=>{
    try{
        const msg = process.env.REGISTER;
        const msg2 = process.env.CANLOGIN;
        const id = req.query.id;
        const data = await Seller.findById(id);
        if(!data)
            res.status(409).send(msg);
        else{
            if(data.isVerified)
                res.status(409).send(msg2);
            else{
                const otp =await _.random(100000,999999);
                const otpTok =await jwt.sign({
                    data: `${otp}`
                  }, otpSecret, { expiresIn: '10m' });
                const token =await jwt.sign({
                    data: `${data._id}`
                  }, otpSecret, { expiresIn: '10m' });
                const info = await transporter.sendMail({
                    from: process.env.USER, // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "One Time Password", // Subject line
                    html: `<p>One Time Password for Auction House is ${otp}. Please provide the OTP in the web page or click in the below link</p><br><a href="http://localhost:3000/seller_otp/?token=${token}">Verify Yourself</a>`, // html body
                  });
                  res.cookie(`otpToken`,`${otpTok}`, {maxAge: 600000}).status(200).send({success, status: info.messageId});
            }
        }
    }
    catch (err){
        res.status(400).send(err);
    }
};
const sellOtp = async(req,res)=>{
    try{
        const error = process.env.FAILED;
        const msg = process.env.VALID;
        const id = req.query.id;
        const verify = req.body.verify;
        const otpTok = req.cookies.otpToken;
        if(!otpTok)
            res.status(400).send(error);
        else{
            const decoded = await jwt.verify(otpTok, otpSecret);
        if(decoded.data==verify){
            const data = await Seller.findByIdAndUpdate(id, {isVerified:true});
            res.clearCookie('otpToken').status(200).send(success);
        }
        else
            res.status(403).send(msg);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const seller_otp = async(req,res)=>{
    try{
        const err = process.env.INVALIDTOKEN;
        const token = req.query.token;
        const decoded = await jwt.verify(token, otpSecret);
        const result = await Seller.findByIdAndUpdate(decoded.data, {isVerified:true});
        if(!result)
            res.status(406).send(err);
        else
            res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyer_forget = (req,res) =>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const buyForget = async(req,res)=>{
    try{
    const msg = process.env.NOTEXIST;
    const email = req.body.email;
    const data = await Regis.findOne({email});
    if(!data)
        res.status(401).send(msg);
    else{
        const token =await jwt.sign({
            data: `${data._id}`
          }, otpSecret, { expiresIn: '10m' });
        const info = await transporter.sendMail({
            from: process.env.USER, // sender address
            to: `${email}`, // list of receivers
            subject: "Reset Password", // Subject line
            html: `<p>Please click on the below link for reset the password. The Link is valid for 10 min</p><br><a href="http://localhost:3000/buyer_reset/?token=${token}">Reset Link</a>`, // html body
          });
          res.status(200).send({success: success, status : info.messageId});
    }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const buyer_reset = async(req, res) =>{
    try{
        const token = req.query.token;
        const err = process.env.INVALIDTOKEN;
        const decoded = await jwt.verify(token, otpSecret);
        const result = await Regis.findById(decoded.data);
        if(!result)
            res.status(406).send(err);
        else{
            const token =await jwt.sign({ data: `${result._id}` }, secret, { expiresIn: '5m' });
            res.cookie(`resetToken`,`${token}`, {maxAge: 600000}).status(200).send(result);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const buyerReset = async(req,res)=>{
    try{
        const error = process.env.FAILED;
        const mis = process.env.MISMATCH;
        const fail = process.env.FAILED;
        const newPass = process.env.NEWPASS;
        const password = req.body.password;
        const token = req.cookies.resetToken;
        if(!token)
            res.status(400).send(error);
        else{
            const decoded = await jwt.verify(token, secret);
            if(!decoded.data)
                res.status(401).send(fail);
            else{
                if(password==req.body.confirm){
                    const temp = await Regis.findById(decoded.data);
                    const hash = temp.password;
                    const verification = await bcrypt.compare(password, hash);
                    if(verification)
                        res.status(406).send(newPass);
                    else{
                        const passcode = await bcrypt.hash(password, saltRounds);
                    const result = await Regis.findByIdAndUpdate(decoded.data, {password: passcode});
                    res.clearCookie('resetToken','authToken').status(200).send(success);
                    }
                    }
                    else
                        res.status(400).send(mis);
                }
        }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const seller_forget = (req,res) =>{
    try{
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const sellForget = async(req,res)=>{
    try{
    const msg = process.env.NOTEXIST;
    const email = req.body.email;
    const data = await Seller.findOne({email});
    if(!data)
        res.status(401).send(msg);
    else{
        const token =await jwt.sign({
            data: `${data._id}`
          }, otpSecret, { expiresIn: '10m' });
        const info = await transporter.sendMail({
            from: process.env.USER, // sender address
            to: `${email}`, // list of receivers
            subject: "Reset Password", // Subject line
            html: `<p>Please click on the below link for reset the password. The Link is valid for 10 min</p><br><a href="http://localhost:3000/seller_reset/?token=${token}">Reset Link</a>`, // html body
          });
          res.status(200).send({success: success, status : info.messageId});
    }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const seller_reset = async(req, res) =>{
    try{
        const resetToken = req.query.token;
        const err = process.env.INVALIDTOKEN;
        const decoded = await jwt.verify(resetToken, otpSecret);
        const result = await Seller.findById(decoded.data);
        if(!result)
            res.status(406).send(err);
        else{
            const token =await jwt.sign({ data: `${result._id}` }, secret, { expiresIn: '5m' });
            res.cookie(`resetToken`,`${token}`, {maxAge: 600000}).status(200).send(result);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const sellerReset = async(req,res)=>{
    try{
        const error = process.env.FAILED;
        const mis = process.env.MISMATCH;
        const fail = process.env.FAILED;
        const newpass = process.env.NEWPASS;
        const password = req.body.password;
        const token = req.cookies.resetToken;
        if(!token)
            res.status(400).send(error);
        else{
            const decoded = await jwt.verify(token, secret);
        if(!decoded.data)
            res.status(401).send(fail);
        else{
            if(req.body.password==req.body.confirm){
                const temp = await Seller.findById(decoded.data);
                const hash = temp.password;
                const verification = await bcrypt.compare(password, hash);
                if(verification)
                    res.status(406).send(newpass);
                else{
                    const password = await bcrypt.hash(req.body.password, saltRounds);
                const result = await Seller.findByIdAndUpdate(decoded.data, {password});
                res.clearCookie('resetToken','authToken').status(200).send(success);
                }
                }
                else
                    res.status(400).send(mis);
            }
        }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const logout = async(req,res)=>{
    try{
        const msg = process.env.NOTLOGIN;
        const isLogin = req.cookies.authToken;
        if(!isLogin)
            res.ststus(400).send(msg);
        else
            res.clearCookie('authToken').status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    } 
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
    sellRegistration,
    buyer_forget,
    buyForget,
    buyer_reset,
    seller_forget,
    sellForget,
    seller_reset,
    buyerReset,
    sellerReset,
    buy_otp,
    buyOtp,
    buyer_otp,
    sell_otp,
    sellOtp,
    seller_otp,
    logout
}