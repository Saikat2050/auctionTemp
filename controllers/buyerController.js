
const {buyerOauth} = require('../config/keys');


const buyer_auth = async(req,res)=>{
    try{
        const result = await passport.authenticate('google', { scope: ['profile'] });
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(err);
    }
};