const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bankSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true,
            default: "SBI"
        },
        account: { type: Number, required: true },
        avatar: { type: String, required: true },
        ifsc: { type: String, required: true },
        branch: { type: String, required: true },
        status: {type: String, required: true,default: "Pending"},
        remark: {type: String, required: true,default:"Verification Pending"},
    },
    { timestamps: true }
);
bankSchema.plugin(uniqueValidator);

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
