const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb+srv://Akshat:Akshat@cluster0.jbf7tsj.mongodb.net/Moodify');
    const userModel = require('./src/models/user.model');
    const email = 'test2@gmail.com';
    const username = undefined;

    try {
        const user = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        }).select("+password");
        console.log('user:', user);
    } catch (err) {
        console.log('Error:', err.message);
    }
    process.exit(0);
}
main();
