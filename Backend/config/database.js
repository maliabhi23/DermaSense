const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = ()=>{

    try {
        mongoose.connect(process.env.MONGODB_URL,{
            useNewurlParser : true,
            useUnifiedTopology:true,
        })
        .then(()=>{
            console.log("Mongo Db connection successful")
        })
        .catch((error)=>{
            console.log("Error connecting to the Database")
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnect;