const cloudinary = require("cloudinary");
const { join } = require("path");
const fs = require("fs");
require("dotenv").config();

const cloudUpload = (req, res, next) => {
  const imgName = req.file.filename;
  //? to create the uploads folder if not exist
  const imgDir = join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "uploads",
    "images"
  );
  !fs.existsSync(imgDir) && fs.mkdirSync(imgDir);

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  const dir = join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "uploads",
    "images",
    imgName
  );
  cloudinary.v2.uploader
    .upload(dir)
    .then((result) => {
      req.mediaUrl = result.url;
      next();
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Connection Error, Image hasn't been Uploaded to the cloud.",
      });
    });
};

module.exports = cloudUpload;
