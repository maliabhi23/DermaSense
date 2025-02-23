const mongoose = require("mongoose");

// const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        maxLength:70,
        required:true,
    },
    localization:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    coordinates:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Image",ImageSchema);
