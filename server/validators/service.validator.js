import Joi from "joi";

export const serviceSchema = Joi.object({
    service_name: Joi.string().min(3).max(50).required(),
    description: Joi.string().optional().allow('', null),
    image: Joi.string().uri().allow('', null),
    image_public_id: Joi.string().allow('', null),
})