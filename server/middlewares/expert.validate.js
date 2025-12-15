import { expertSchema } from "../validators/expert.validator.js";


export const validateExpert = (req, res, next) => {
    const { error } = expertSchema.validate(req.body, {abortEarly: false});
    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map((d) => d.message),
        });
    }
    next();
}