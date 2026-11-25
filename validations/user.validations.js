const Joi = require("joi")

const registerSchema = Joi.object({
    username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.min': 'Username must have between 3 and 30 characters',
                'string.max': 'Username must have between 3 and 30 characters',
                'any.required': 'Username is required'
            }),
    email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email-ul nu este valid',
                'any.required': 'Email is required'
            }),
    password: Joi.string()
            .min(8)
            .required()
            .messages({
                'any.required': 'Password is required'
            }),
    role: Joi.string()
            .valid('Client', 'Receptionist', 'Admin')
            .required()
            .messages({
                'any.only': 'Role must be "Client", "Receptionist" or "Admin"'
            })
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$")).required()
})

module.exports = {
    registerSchema,
    loginSchema
}