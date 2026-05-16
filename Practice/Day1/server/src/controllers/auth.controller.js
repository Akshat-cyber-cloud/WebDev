const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: "User Registeration Successfull",
            userId: user._id
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            success: true,
            token,
            message: "User Login Successfull"
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};