import Joi from "joi";

export const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().allow('', null),
    message: Joi.string().min(5).max(500).required(),
})