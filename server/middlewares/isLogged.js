const { verify } = require("jsonwebtoken");

const isLogged = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    res.send({ msg: "no Logged User" });
  } else {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.status(401).send({ msg: "no Logged User" });
      else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = isLogged;
