const { verify } = require("jsonwebtoken");

const virefyLogin = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    res.redirect("/");
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

module.exports = virefyLogin;
