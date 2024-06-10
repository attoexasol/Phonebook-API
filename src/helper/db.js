const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

module.exports = connectDb;
