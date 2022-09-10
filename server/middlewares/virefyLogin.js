const { verify } = require("jsonwebtoken");
const { join } = require("path");

const virefyLogin = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    res
      .status(401)
      .sendFile(join(__dirname, "..", "..", "public", "errors", "401.html"));
  } else {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .sendFile(
            join(__dirname, "..", "..", "public", "errors", "401.html")
          );
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = virefyLogin;
