const { compare } = require("bcryptjs");
const { loginCheckQ } = require("../../database/queries");
const loginValidation = require("./loginValidation");

const login = (req, res) => {
  const { username, password } = req.body;
  const validation = loginValidation(req.body);
  if (validation.error) {
    res.send(validation.error.details);
  } else {
    loginCheckQ(username).then((data) => {
      if (data.rowCount === 0) {
        res.send({ msg: "User not found" });
      } else {
        const user = data.rows[0];
        compare(password, user.password, (err, success) => {
          if (err) console.log(err);
          else {
            success ? res.send("logged") : res.send({ msg: "wrong password" });
          }
        });
      }
    });
  }
};

module.exports = login;
