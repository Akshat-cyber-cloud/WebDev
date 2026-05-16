const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
        select: false,
    }
}, {timestamps: true});

// Pre Save Hook

userSchema.pre('save', async function (){
    if(!this.isModified('password')){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//  Method to compare entered password with hashed password

userSchema.methods.comparePassword = async function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;
