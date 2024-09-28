const adminMiddlware = async (req, res, next) => {
    try {


        const adminRole = req.user.isAdmin

        if (adminRole) {
            // res.status(200).json({msg : "Admin "})
            next()
        }
        else {
            res.status(400).json({ msg: "User is not Admin " })
            
        }
       
    } catch (error) {

        console.log(error)
    }
}


module.exports = adminMiddlware