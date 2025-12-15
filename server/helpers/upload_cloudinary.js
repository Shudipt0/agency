import cloudidary from "../utilities/cloudinary.js";


export const uploadToCloudinary = async (localFilePath) => {
    try {
        const result = await cloudidary.uploader.upload(localFilePath, {
            resource_type: "auto",            
        });
        return result;
    } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
   }
}