const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const authMiddlware = async (req, res, next) => {

    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: "Token not provided" })
    }

    const jwtToken = token.replace("Bearer", "").trim()

    // console.log('Token from ', jwtToken)


    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_TOKEN)


        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0, })
        // console.log(userData)

        req.user = userData,
            req.token = token
        req.userID = userData._id


        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" })
    }

}




module.exports = authMiddlware