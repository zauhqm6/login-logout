const User = require('../models/user-model');
const Contact = require('../models/contact-model');

// Logic for getting all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });

        if (users && users.length > 0) {
            return res.status(200).json(users);  // Send response and return
        } else {
            return res.status(404).json({ message: "No Users Found" });  // Send 404 if no users found
        }
    } catch (error) {
        return next(error);  // Call next with the error
    }
};

// Logic for getting all contacts
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();

        if (contacts && contacts.length > 0) {
            return res.status(200).json(contacts);
        } else {
            return res.status(404).json({ message: "No Contacts Found" });  // Send 404 if no contacts found
        }
    } catch (error) {
        return next(error);  // Call next with the error
    }
};



// Get User ID 

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await User.find({ _id: id }, { password: 0 });
        res.status(200).json({ data })

    } catch (error) {
        return next(error);
    }
};


// Update user


const updateUserById = async (req, res) => {
    try {
        const id = req.params.id

        const userUpdatedData = req.body


        const updateUser = await User.updateOne({ _id: id }, {
            $set: userUpdatedData
        });
        res.status(200).json({ updateUser })

    } catch (error) {
        console.log(error)

    }

}


// Delete User

const deletUserById = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "User Deleted " })

    } catch (error) {
        console.log(error)

    }

}

const deletContactById = async (req, res) => {
    try {
        const id = req.params.id
        await Contact.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Contact Deleted " })

    } catch (error) {
        console.log(error)

    }

}




module.exports = { getAllUsers, getAllContacts, deletUserById, getUserById, updateUserById, deletContactById };
