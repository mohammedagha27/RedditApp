const { verify } = require("jsonwebtoken");

const isLogged = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    res.send({ msg: "You must Login" });
  } else {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.sendStatus(401);
      else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = isLogged;
