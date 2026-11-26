const express = require("express")
const router = express.Router()
const {registerSchema, loginSchema} = require("../validations/user.validations")
const validate = require("../middlewares/validate.middleware")
const {register, login} = require("../controllers/user.controller")


router.post("/", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)

module.exports = router