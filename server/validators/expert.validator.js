import Joi from "joi";

export const expertSchema = Joi.object({
    expert_name: Joi.string().min(3).max(20).required(),
    bio_data: Joi.string().optional().allow('', null),
    thought: Joi.string().optional().allow('', null),
    image: Joi.string().uri().allow('', null),
    image_public_id: Joi.string().allow('', null),
})