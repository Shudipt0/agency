import { contactSchema } from "../validators/contact.validator.js";


export const validateContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body, {abortEarly: false});
    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map((d) => d.message),
        });
    }
    next();
}