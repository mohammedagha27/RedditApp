const { join } = require("path");

const unauthorized = (req, res) => {
  res.sendFile(
    join(__dirname, "..", "..", "..", "public", "errors", "401.html")
  );
};

module.exports = unauthorized;
