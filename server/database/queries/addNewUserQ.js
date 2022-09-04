const connection = require("../config/connection");

const addNewUserQ = ({ email, username, password }) => {
  return connection.query(
    `
  INSERT INTO
    users(
        username,
        email,
        password
    )
    VALUES (
        $1,$2,$3
    ) RETURNING *;
  `,
    [username, email, password]
  );
};

module.exports = addNewUserQ;
