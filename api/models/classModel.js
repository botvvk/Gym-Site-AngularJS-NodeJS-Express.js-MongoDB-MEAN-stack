const mongoose = require("mongoose");


const classesSchema = new mongoose.Schema({
    id: { type: String},
    classname: { type: String },
    description: {type: String  },
    day:  {  type: String    },
    time: {  type:String}

})

const Class = mongoose.model("Class",classesSchema);

module.exports = Class;
