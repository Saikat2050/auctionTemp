const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
    {
        auction: {
            type: String,
            required: true,
            default: "Auction House"
        },
        organiser: {
            type: String,
            required: true,
            default: "Auction House"
        },
        details: { type: String },
        address: { type: String, required: true, default: "online" },
        date: {type: Date, required: true},
        contact: {type: Number},
        isDeleted:{type: Boolean, required: true, default: false},
    },
    { timestamps: true }
);
auctionSchema.plugin(uniqueValidator);

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
