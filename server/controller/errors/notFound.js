const { join } = require("path");

const notFound = (req, res) => {
  res.sendFile(
    join(__dirname, "..", "..", "..", "public", "errors", "404.html")
  );
};

module.exports = notFound;
