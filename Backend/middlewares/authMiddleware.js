const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token missing or invalid format",
            });
        }

        const token = authHeader.split(" ")[1]; 
        const payload = jwt.verify(token, process.env.JWT_SECRET); 

        console.log("Decoded Payload:", payload); 
        req.user = payload; 
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};