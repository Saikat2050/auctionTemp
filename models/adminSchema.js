const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: { type: String, required: true },
    },
    { timestamps: true }
);
adminSchema.plugin(uniqueValidator);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
