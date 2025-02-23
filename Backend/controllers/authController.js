
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email: email }, { name: name }]
        });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error hashing the password",
            });
        }

        await User.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Incorrect password",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
};

module.exports = { signup, login };
