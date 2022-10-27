const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        item: {
            type: String,
            required: true,
        },
        avatar:{type: String},
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        auctionId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Auction"
        },
        return: {type: Date, required: true, default: Date.now()},
        status: {type: String},
        remark: {type: String},
    },
    { timestamps: true }
);
itemSchema.plugin(uniqueValidator);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
