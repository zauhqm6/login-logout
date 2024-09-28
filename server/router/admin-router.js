const express = require('express')
const adminController = require('../controllers/admin-controller')
const authMiddlware = require('../middleware/authMiddlware')
const adminMiddlware = require('../middleware/admin-middleware')
const router = express.Router()



router.route('/users').get(authMiddlware, adminMiddlware, adminController.getAllUsers)
router.route('/contacts').get(authMiddlware, adminController.getAllContacts)
router.route('/users/:id').get(authMiddlware, adminMiddlware, adminController.getUserById)
router.route('/users/update/:id').patch(authMiddlware, adminMiddlware, adminController.updateUserById)
router.route('/users/delete/:id').delete(authMiddlware, adminMiddlware, adminController.deletUserById)
router.route('/contacts/delete/:id').delete(authMiddlware, adminMiddlware, adminController.deletContactById)



module.exports = router