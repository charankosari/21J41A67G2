const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shivacharan:shivacharan@afford.ioohu.mongodb.net/?retryWrites=true&w=majority&appName=afford");
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
