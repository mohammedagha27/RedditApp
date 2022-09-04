const {
  getUserByEmailQ,
  getUserByNameQ,
  addNewUserQ,
} = require("../../database/queries");
const checkNewUserEmail = require("./test");

const signUp = (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  res.send("");
  getUserByEmailQ(email).then((data) => {
    if (data.rowCount === 0) {
      getUserByNameQ(username).then((result) => {
        if (result.rowCount === 0) {
          addNewUserQ({ email, username, password }).then((data) =>
            res.json(data.rows)
          );
        } else {
          res.json({ msg: "username already Exists" });
        }
      });
    } else {
      res.json({ msg: "Email Already Exists" });
    }
  });
};

module.exports = signUp;
