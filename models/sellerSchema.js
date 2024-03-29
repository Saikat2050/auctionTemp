const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        number: { type: Number, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        isVerified: {type: Boolean, default: false},
    },
    { timestamps: true }
);
sellerSchema.plugin(uniqueValidator);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
