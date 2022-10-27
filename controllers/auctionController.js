const Auction = require('../models/auctionSchema');
const Item = require('../models/itemSchema');
const dotenv = require('dotenv').config();
const nodata = process.env.NODATA;
const secret = process.env.SECRECT;

const dashboard = async(req,res)=>{
    try{
            const user = req.user;
            const auct = await Auction.find({isStarted: true}).limit(1);
            if(!auct)
                res.status(400).send(nodata);
            else{
                const token =await jwt.sign({ data: `${auct._id}` }, secret, { expiresIn: '1h' });
                const data = await Item.find({auctionId: auct._id});
                res.cookie('auctToken', `${token}`).status(200).send(success, data);
            }
    }
    catch(err){
        res.status(400).send(err);
    }
};
const signout = async(req,res)=>{
    try{
            const user = req.user;
            res.status(200).redirect('/');
    }
    catch(err){
        res.status(400).send(err);
    }
};