const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const paySchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "seller"
        },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        status: {type: String, required: true,default: "Processing"},
        remark: {type: String, required: true,default:"Your payment is still Processing"},
    },
    { timestamps: true }
);
paySchema.plugin(uniqueValidator);

const Pay = mongoose.model("Pay", paySchema);
module.exports = Pay;
