const mongoose = require('mongoose')
const { string, number } = require('zod')



const serviceschema = new mongoose.Schema({

    service: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,

    },
    price: {
        type: String,
        require: true,

    },
    provider: {
        type: String,
        require: true,

    }

})


const Service = new mongoose.model("service", serviceschema)

module.exports = Service