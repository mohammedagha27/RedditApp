const { hash } = require("bcryptjs");
const {
  getUserByEmailQ,
  getUserByNameQ,
  addNewUserQ,
} = require("../../database/queries");
const { checkNewUserData } = require("./checkNewUserData");
const generateToken = require("./generateToken");
const signupValidation = require("./signupValidation");

const signUp = (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  //* validate the user inputs
  const validation = signupValidation(req.body);

  if (validation.error) {
    res.send(validation.error.details);
  } else {
    //* check if the email or username is taken by another user
    checkNewUserData(email, username).then((data) => {
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
