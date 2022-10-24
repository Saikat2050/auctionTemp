const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const buySchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        item: {
            type: String,
            required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        basePrice: { type: Number, required: true },
        highest: { type: Number, required: true },
        return: {type: Date, required: true, default: Date.now()},
        status: {type: String, default: "Success"},
        remark: {type: String},
    },
    { timestamps: true }
);
buySchema.plugin(uniqueValidator);

const Buy = mongoose.model("Buy", buySchema);
module.exports = Buy;
