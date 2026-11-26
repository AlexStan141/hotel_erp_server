const Joi = require("joi")

const registerSchema = Joi.object({
    username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.min": "Username must have between 3 and 30 characters",
                "string.max": "Username must have between 3 and 30 characters",
                "string.empty": "Username must not be empty",
                "any.required": "Username is required",       
            }),
    email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Invalid email address",
                "string.empty": "Email must not be empty",
                "any.required": "Email is required"
            }),
    password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$"))
            .required()
            .messages({
                "string.min": "Password must have at least 8 characters",
                "string.pattern.base": "Password must consist of uppercase letters, lowercase letters, numbers and symbols",
                "string.empty": "Password must not be empty",
                "any.required": "Password is required"
            }),
    role: Joi.string()
            .valid("Client", "Receptionist", "Admin")
            .required()
            .messages({
                "string.empty": "Role must not be empty",
                "any.only": "Role must be \"Client\", \"Receptionist\" or \"Admin\"",
                "any.required": "Role is required"
            })
})

const loginSchema = Joi.object({
    email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Invalid email address",
                "string.empty": "Email must not be empty",
                "any.required": "Email is required"
            }),
    password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$"))
            .required()
            .messages({
                "string.min": "Password must have at least 8 characters",
                "string.pattern.base": "Password must consist of uppercase letters, lowercase letters, numbers and symbols",
                "string.empty": "Password must not be empty",
                "any.required": "Password is required"
            })
})

module.exports = {
    registerSchema,
    loginSchema
}