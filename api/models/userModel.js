const mongoose = require("mongoose");
require('mongoose-type-email');

const usersSchema = new mongoose.Schema({
    id: { type: String},
    email: {
        type:mongoose.SchemaTypes.Email,
        required:[true,"Enter your email"],
        lowercase: true
    },
    password:  {
        type: String,
        required:[true,"Enter your password"]
    },
    username: {
        type:String
    },
    mobile: {
        type:String
    },
    role: {
        type:String
    }

})

const User = mongoose.model("User",usersSchema);

module.exports = User;
