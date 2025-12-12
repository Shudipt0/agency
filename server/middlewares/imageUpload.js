import { uploader } from "../utilities/singleImageUploader";

export const imageUpload = (req, res, next) => {
    const upload = uploader(
        "images",
        ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        2000000,
        "Only .jpg, .jpeg, .png, .webp formats are allowed and size must be under 2MB"
    );

    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        } else {
            next();
        }
    })
}