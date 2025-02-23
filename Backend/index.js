//app
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT 
app.use(express.json());
app.use(cors());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//dbConnect
const dbConnect = require("./config/database.js");
dbConnect();

//routes Mount
 const authRoutes = require("./routes/userRoutes.js");
 const hospitalRoutes = require('./routes/hospitals.js');
 const fileUpload = require("express-fileupload");
 app.use("/api/v1",authRoutes);
 app.use('/api/hospitals', hospitalRoutes);



//cloudConnect

const cloudinaryConnect = require("./config/cloudinary.js");
cloudinaryConnect();


//app listens
app.listen(PORT,()=>{
    console.log(`Application running on the post : ${PORT}`);
})



