import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

async function sendTokenResponse(user,res){
    const token = jwt.sign({ 
        id: user._id 
    }, config.JWT_SECRET, { expiresIn: '2h' });
}

export const registerValidation = async (req, res) => {
    const { email, contact, password, fullname } = req.body;

    try {
        // Check if the email or contact already exists
        const existingUser = await userModel.findOne({ 
            $or: [{ email }, { contact }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or contact already exists' });
        }

        const user = new userModel.create({
            email,
            contact,
            password,
            fullname
        });



    } catch (error) {
        console.error('Error checking existing user:', error);
        return res.status(500).json({ message: 'Server error' });
    }  
}