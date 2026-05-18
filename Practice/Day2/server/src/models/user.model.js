const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is must"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is must"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Must create / Give password"],
        minlength: 6,
        select: false
    }
}, {timestamps: true});

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function (passcode) {
    return bcrypt.compare(passcode,this.password);
}

const user = mongoose.model('User', userSchema);
module.exports = user;
