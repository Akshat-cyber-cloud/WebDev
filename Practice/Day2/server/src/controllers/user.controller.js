const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "Email Id Already Exists"
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            userId: user._id
        });

    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const isPresent = await User.findOne({email}).select("+password");

        if(!isPresent){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await isPresent.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {id: isPresent._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            token
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};