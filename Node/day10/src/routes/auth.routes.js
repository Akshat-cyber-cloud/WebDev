const express = require("express");
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const crypto = require('crypto');

authRoutes.post("/register", async (req,res) => {
    const {name,email,password} = req.body;

    const isUserAlreadyPresent = await userModel.findOne({email});

    if(isUserAlreadyPresent){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name,email,password: hash
    })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET);

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

authRoutes.post("/protected", (req,res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "Protected Route Hit"
    });
})

authRoutes.post("/login", async (req,res) => {
    const {email , password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "User Logged In",
        user
    })
})


module.exports = authRoutes;