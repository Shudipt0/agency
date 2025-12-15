import Joi from "joi";

export const projectSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    category: Joi.string().optional().allow('', null),
    description: Joi.string().optional().allow('', null),
    image: Joi.string().uri().allow('', null),
    link: Joi.string().uri().optional().allow('', null),
    image_public_id: Joi.string().allow('', null),
})