import fs from "fs";
import multer from "multer";
import path from "path";

export const uploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  //   file upload folder
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

  // ensure directory exists
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

  // difine storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-");
      cb(null, fileName + fileExt);
    },
  });

  const fileFilter = (req, res, cb) => {
    // if no file is provided, just continue
    if (!file || !file.mimetype) {
      return cb(null, true);
    }

    // if file exists, vailadte mimetype
    if (allowed_file_types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(error_msg));
    }
  };

  // prepare final multer upload
  const upload = multer({
    storage: storage,
    limits: { fieldSize: max_file_size },
    fileFilter: fileFilter,
  });

  return upload;
};
