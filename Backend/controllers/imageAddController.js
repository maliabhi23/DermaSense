const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Image = require("../models/imageModel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const {getPrediction} = require('./modelController');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Function to check if the file type is supported
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// Function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  //console.log("Temp file path:", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


const genAI = new GoogleGenerativeAI(process.env.APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const getRespnoseFromAI = async(prompt)=>{
  const result = await model.generateContent(prompt);
  return result.response.text();
}

const addImage = async (req, res) => {
  try {
    const { age, sex, localization, address, coordinates } = req.body;
    const post = req.user ? req.user.id : null;

    // Check if file exists
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const file = req.files.imageFile;

    // Validate file type
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({ success: false, message: "File format not supported" });
    }

    console.log('Processing image...');
    console.log(file);
    //const filePath = `./uploads/${file.name}`
    const predictedData = await getPrediction(file, sex, age, localization);
    //console.log('Prediction Result:', predictedData);

    let result;

    if(predictedData){
      
      if(predictedData.prediction < 0.01 && predictedData.diagnosis === 'Benign'){
        predictedData.diagnosis = 'No Cancer';
      }

      const input = `I have received the results from a skin cancer detection model, which include the following details:  
      - **Diagnosis:** ${predictedData.diagnosis}  
      
      I need guidance on **preventive measures** and possible **prescriptions** based on these results. Please provide valuable insights, including:  
      1. Steps to take based on the diagnosis.  
      2. Preventive measures for maintaining skin health.  
      3. Possible treatment or next steps if needed.  
      4. Encouraging and positive thoughts to stay strong and hopeful. ✨😊  
      
      Give the clear information in short format. Give disclaimer at the end of response under Note. Add emojies as per the statement you want to convey. For life threating diseases use high alert or attention emoji. Highlight improtant bullet points and make proper layout so that i can directly shows this text in div tag without considering newlines, breakpoints and spaces`;

      result = await getRespnoseFromAI(input);
      console.log(result);
      // res.status(200).send({result});
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadFileToCloudinary(file, "DermaSense");

    // Create new image document
    const newImageData = {
      age: age || null,
      sex: sex || null,
      localization: localization || null,
      address: address || null,
      coordinates: coordinates || null,
      image: cloudinaryResponse.secure_url,
    };

    if (post) {
      newImageData.post = new mongoose.Types.ObjectId(post);
    }

    const newImage = new Image(newImageData);

    // Save image document to database
    await newImage.save();


    res.status(201).json({
      success: true,
      message: "Image successfully uploaded",
      predictedData,
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add image", details: error.message });
  }
};


// Controller to add an image
// const addImage = async (req, res) => {
//   try {
//     const { age, sex, localization, address, coordinates } = req.body;

//     const post = req.user ? req.user.id : null;
//     //console.log("Extracted User ID:", post);

//     // Check if file exists
//     if (!req.files || !req.files.imageFile) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }



//     const file = req.files.imageFile;
//     //console.log("Uploaded File:", file);

//     // Validate file type
//     const supportedTypes = ["jpg", "jpeg", "png"];
//     const fileType = file.name.split(".").pop().toLowerCase();

//     if (!isFileTypeSupported(fileType, supportedTypes)) {
//       return res.status(400).json({ success: false, message: "File format not supported" });
//     }

//     console.log('hi');
//     const predictedData = await getPrediction(req.files,sex,age,localization);
//     console.log('predication',predictedData);


//     // Upload to Cloudinary
//     //console.log("Uploading to Cloudinary...");
//     const cloudinaryResponse = await uploadFileToCloudinary(file, "DermaSense");
//     //console.log("Cloudinary Response:", cloudinaryResponse);

//     // Create new image document
//     const newImageData = {
//       age: age || null,
//       sex: sex || null,
//       localization: localization || null,
//       address: address || null,
//       coordinates: coordinates || null,
//       image: cloudinaryResponse.secure_url,
//     };

//     if (post) {
//       newImageData.post = new mongoose.Types.ObjectId(post);
//     }

//     const newImage = new Image(newImageData);

//     // Save image document to database
//     await newImage.save();

//     res.status(201).json({
//       success: true,
//       imageUrl: cloudinaryResponse.secure_url,
//       message: "Image successfully uploaded",
//       data: newImage,
//       predictedData
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to add image", details: error.message });
//   }
// };

module.exports = { addImage };




// controllers/predictController.js

