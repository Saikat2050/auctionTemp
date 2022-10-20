const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const buyerSchema = new Schema(
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
        password: { type: String, default: true },
        address: { type: String, default: true },
    },
    { timestamps: true }
);
buyerSchema.plugin(uniqueValidator);

const Regis = mongoose.model("Regis", buyerSchema);
module.exports = Regis;
