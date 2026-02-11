const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

async function loginController(req, res) {
    const {username ,email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                email: email
            },
            {
                username: username
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const isPasswordCorrect = hash === user.password;

    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    });
}

async function registerController(req, res) {
    const {email,username,password,bio,profileImg} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists" + (isUserAlreadyExists.email === email ? " with this email" : " with this username")
        })
    }

    const user = await userModel.create({
        username,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex'),
        bio,
        profileImg
    })

    const token = jwt.sign({
        id: user._id,
    },
    process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: { 
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    });

}

module.exports = {
    loginController,
    registerController
}
