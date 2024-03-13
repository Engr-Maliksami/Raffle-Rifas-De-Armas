// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING, {});
        console.log('Connected to MongoDB Atlas');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
