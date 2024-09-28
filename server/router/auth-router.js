const express = require('express')

const router = express.Router();

const authController = require('../controllers/auth-controller')

const { signupSchema, loginSchema } = require('../validator/auth-validator')

const validate = require('../middleware/validate-middleware')
const authMiddlware = require('../middleware/authMiddlware')


router.route('/').get(authController.home)
router.route('/register').post(validate(signupSchema), authController.registration)
router.route('/login').post(validate(loginSchema), authController.loginPage)
router.route('/user').get(authMiddlware, authController.user)
// router.route('/contact').get(authMiddlware, authController.contact)



module.exports = router