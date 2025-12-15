import { projectSchema } from "../validators/project.validator.js";

export const validateProject = (req, res, next) => {
    const { error } = projectSchema.validate(req.body, {abortEarly: false});
    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map((d) => d.message),
        });
    }
    next();
}