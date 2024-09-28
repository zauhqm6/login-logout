const User = require('../models/user-model')
const bcrypt = require('bcryptjs');


const home = async (req, res) => {
    try {
        res.send('Home Page')

    } catch (error) {
        console.log(error);
    }
}

// Registration
const registration = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(400).json({ message: "user already exists" })
        }

        const userCreated = await User.create({ username, email, phone, password })
        res.status(201).json({ msg: "Registration Successful", token: await userCreated.generateToken(), userId: userCreated._id.toString() })
    } catch (error) {
        console.log(error);
    }
}



const loginPage = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body

        const userExist = await User.findOne({ email: email })

        if (!userExist) {
            return res.status(400).json({ message: "Email Not Registered" })
        }
     

        const comparePass = await userExist.comparePassword(password)

        if (comparePass) {
            res.status(200).json({
                msg: "login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()

            })
        }
        else {
            res.status(400).json({
                message: "Wrong password",
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const user = async (req, res) => {
    try {
        const userData = req.user

        return res.status(200).json({ userData })

    } catch (error) {
        console.log(error)
    }
}




module.exports = { home, registration, loginPage, user }