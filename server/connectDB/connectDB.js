const mongoose = require('mongoose');


const connectDB = async (DB_URL) => {
    try {
        const result = await mongoose.connect(DB_URL)
        console.log('Connected With DB')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB