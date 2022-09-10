const multer = require("multer");
const { join } = require("path");
const fs = require("fs");

const localUpload = () => {
  //? to create the uploads folder if not exist
  const dir = join(__dirname, "..", "..", "..", "public", "uploads", "images");
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  const fileStorage = multer.diskStorage({
    //* the directory where the file will be stored.
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    //* the new name that will be given to the file before storing it.
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: fileStorage });
  return upload;
};

module.exports = localUpload;
