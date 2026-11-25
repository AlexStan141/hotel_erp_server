const express = require("express")
const router = express.Router()
const {registerSchema, loginSchema} = require("../validations/user.validations")
const validate = require("../middlewares/validate.middleware")
const {register} = require("../controllers/user.controller")


router.post("/", validate(registerSchema), register)

module.exports = router