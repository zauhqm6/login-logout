const express = require('express')
const router = express.Router();
const contactController = require('../controllers/contact-controller')
const { contactSchema } = require('../validator/contact-validator')
const validate = require('../middleware/validate-middleware')





router.route("/contact").post(validate(contactSchema), contactController)




module.exports = router