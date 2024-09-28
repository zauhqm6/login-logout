const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI


const connectDb = async () => {
    try {
        await mongoose.connect(URI).then(console.log("Database Connected"))

    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDb