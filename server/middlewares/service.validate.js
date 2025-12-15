import { serviceSchema } from "../validators/service.validator.js";

export const validateService = (req, res, next) => {
    const { error } = serviceSchema.validate(req.body, {abortEarly: false});
    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map((d) => d.message),
        });
    }
    next();
}