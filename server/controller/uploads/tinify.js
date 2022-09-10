const tinify = require("tinify");
require("dotenv").config();
const { join } = require("path");
const fs = require("fs");

tinify.key = process.env.TINIFY_KEY;

const reduceSize = (req, res, next) => {
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
  const source = tinify.fromFile(
    join(__dirname, "..", "..", "..", "public", "uploads", "images", imgName)
  );
  source
    .toFile(
      join(__dirname, "..", "..", "..", "public", "uploads", "images", imgName)
    )
    .then((result) => {
      console.log(result);
      next();
    });
};

module.exports = reduceSize;
