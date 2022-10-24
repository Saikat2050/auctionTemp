const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const kycSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        document: {
            type: String,
            required: true,
            default: "aadhar"
        },
        number: { type: Number, required: true },
        avatar: { type: String, required: true },
        userType: { type: String, required: true, default: "seller" },
        status: {type: String, required: true,default: "Pending"},
        remark: {type: String, required: true,default:"Verification Pending"},
    },
    { timestamps: true }
);
kycSchema.plugin(uniqueValidator);

const Kyc = mongoose.model("Kyc", kycSchema);
module.exports = Kyc;
