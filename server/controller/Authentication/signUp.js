const { hash } = require("bcryptjs");

const { addNewUserQ, checkNewUserDataQ } = require("../../database/queries");
const { signupValidation } = require("../../validation");
const generateToken = require("./generateToken");

const signUp = (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  //* validate the user inputs
  const validation = signupValidation(req.body);

  if (validation.error) {
    res.send(validation.error.details);
  } else {
    //* check if the email or username is taken by another user
    checkNewUserDataQ(email, username).then((data) => {
      if (data.rowCount === 0) {
        hash(password, 10, (err, encoded) => {
          if (err) console.log(err);
          else {
            addNewUserQ({ email, username, encoded }).then((data) => {
              const user = data.rows[0];
              generateToken(req, res, user);
            });
          }
        });
      } else {
        data.rows[0].email === email
          ? res.send({ msg: "Email already Exist" })
          : "";
        data.rows[0].username === username
          ? res.send({ msg: "username already Exist" })
          : "";
      }
    });
  }
};

module.exports = signUp;
