const Buy = require('../models/buyHistSchema');

const buyer_dashboard = (req,res)=>{
    try{
            const user = req.user;
            res.status(200).send(success);
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
        const data = req.body.description;
        const id = req.query.id;
        const result = await Buy.findByIdAndUpdate(id,{remark:data, status:"applied for return"});
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

module.exports = {
    buyer_dashboard,
    returnItem,
    createReturn,
    listReturn
}