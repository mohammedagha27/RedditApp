const connection = require("../config/connection");

const addNewUserQ = ({ email, username, encoded }) => {
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
    [username, email, encoded]
  );
};

module.exports = addNewUserQ;
