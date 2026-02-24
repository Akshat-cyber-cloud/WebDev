const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true , "User With This Name already Exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email Already Exists"],
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false    // Used to hide password 
    },
    bio: String,
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/9klfbvm7i/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.avif"
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;