const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConnect = ()=>{

    try {
        cloudinary.config({
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_SECRET_KEY,
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = cloudinaryConnect;