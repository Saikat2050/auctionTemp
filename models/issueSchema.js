const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const issueSchema = new Schema(
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
        issue: { type: String, required: true },
        description: { type: String, required: true },
        status: {type: String, required: true,default: "Pending"},
        remark: {type: String, required: true,default:"Your issue will be resolved shortly"},
    },
    { timestamps: true }
);
issueSchema.plugin(uniqueValidator);

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
