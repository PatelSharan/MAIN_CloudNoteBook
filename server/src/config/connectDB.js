// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const connectDB = async (DB_URL) => {
    try {
        const result = await mongoose.connect(DB_URL)
        console.log('Connected With DB')
    } catch (error) {
        console.log(error)
    }
}


// module.exports = connectDB
export default connectDB