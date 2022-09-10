const { sign } = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (req, res, data) => {
  sign(data, process.env.SECRET_KEY, { algorithm: "HS256" }, (err, encoded) => {
    if (err) res.status(500).json({ statusCode: 500, error: "server Error" });
    else {
      res.cookie("token", encoded).send({ success: "User Logged" });
    }
  });
};

module.exports = generateToken;
