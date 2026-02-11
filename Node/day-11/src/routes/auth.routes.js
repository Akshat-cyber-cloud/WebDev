const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


authRouter.post("/register", async (req,res) => {
    const {name,email,password} = req.body;

    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return res.status(409)
        .json({
            message: "User already Exsit"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {expiresIn: "1hr"})

    res.cookie("token", token);

    res.status(201).json({
        message: "User Created Successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })

})

authRouter.get("/get-me", async (req,res) => {
    const token = req.cookies.token;

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decode.id);

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post('/login', async (req,res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const isPassword  = hash === user.password;

    if(!isPassword){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {expiresIn: "1hr"})

    res.cookie("token", token);

    res.json({
        message: "Login Success",
        token: token
    })
})


module.exports = authRouter;