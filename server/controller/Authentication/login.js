const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { loginCheckQ } = require("../../database/queries");
const generateToken = require("./generateToken");
const loginValidation = require("../../validation/loginValidation");

const login = (req, res) => {
  const { username, password } = req.body;
  //* validate the user inputs
  const validation = loginValidation(req.body);
  if (validation.error) {
    res.status(400).json(validation.error.details);
  } else {
    //* serch if the user exists in the database
    loginCheckQ(username).then((data) => {
      if (data.rowCount === 0) {
        res
          .status(400)
          .json([{ message: "User not found", path: ["username"] }]);
      } else {
        const user = data.rows[0];
        //* compare the returned user password with the input password
        compare(password, user.password, (err, success) => {
          if (err) console.log(err);
          else {
            success
              ? generateToken(req, res, user)
              : res
                  .status(400)
                  .json([{ message: "wrong Password", path: ["password"] }]);
          }
        });
      }
    });
  }
};

module.exports = login;
