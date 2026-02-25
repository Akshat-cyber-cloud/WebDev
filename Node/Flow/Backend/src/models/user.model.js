const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String
        },

        avatar: {
            type: String
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    const salt = await bycrpt.genSalt(10);
    this.password = await bycrpt.hash(this.password, salt);

    next();
})



const User = mongoose.model("User", userSchema);

module.exports = User;