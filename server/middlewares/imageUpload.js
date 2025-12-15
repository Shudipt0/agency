import fs from "fs";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);

import { uploadToCloudinary } from "../helpers/upload_cloudinary.js";
import { uploader } from "../utilities/singleImageUploader.js";

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
      try {
        const image = req.file;
        // console.log(req.file?.path);
        // upload to cloudinary
        if (image) {
          const result = await uploadToCloudinary(image.path);
          req.body.image = result.secure_url;
          req.body.image_public_id = result.public_id;

          // Delete the local file after upload
          if (result) {
            await unlinkFile(image.path);
          }
        } else {
             // No file upload, possibly json body
          if(typeof req.body.image === 'string'){
            req.body.image =  req.body.image;
          }
        }
        next();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  });
};
