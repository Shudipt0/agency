import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    profession: Joi.string().optional().allow('', null),
    bio_data: Joi.string().optional().allow('', null),
    image: Joi.string().uri().allow('', null),
    image_public_id: Joi.string().allow('', null),
})