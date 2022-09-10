const connection = require("../../config/connection");

const checkNewUserDataQ = (email, username) => {
  return connection.query(
    "select * from users where email=$1 or username= $2",
    [email, username]
  );
};

module.exports = checkNewUserDataQ;
