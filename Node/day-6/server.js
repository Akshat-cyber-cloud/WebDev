const app = require('./src/app');
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb+srv://Akshat:Akshat@cluster0.jbf7tsj.mongodb.net/day-6")
    .then(() => console.log("Connected to MongoDB"))
}

connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});