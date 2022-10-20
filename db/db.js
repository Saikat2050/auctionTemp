const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/auctionHouse';
mongoose.Promise = global.Promise;
/*mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
*/
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
console.log('connected to db');
})
.catch((err)=>{
console.log(err);
});