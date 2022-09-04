const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginCheckQ } = require("../../database/queries");
const generateToken = require("./generateToken");
const loginValidation = require("./loginValidation");

const login = (req, res) => {
  const { username, password } = req.body;
  //* validate the user inputs
  const validation = loginValidation(req.body);
  if (validation.error) {
    res.send(validation.error.details);
  } else {
    //* serch if the user exists in the database
    loginCheckQ(username).then((data) => {
      if (data.rowCount === 0) {
        res.send({ msg: "User not found" });
      } else {
        const user = data.rows[0];
        //* compare the returned user password with the input password
        compare(password, user.password, (err, success) => {
          if (err) console.log(err);
          else {
            success
              ? generateToken(req, res, user)
              : res.send({ msg: "wrong password" });
          }
        });
      }
    });
  }
};

module.exports = login;
