const connection = require("../../config/connection");

const addNewPostQ = ({ title, content, user_id }) => {
  return connection.query(
    `INSERT INTO
    posts(title, content, user_id)
    VALUES ($1, $2, $3);
    `,
    [title, content, user_id]
  );
};

module.exports = addNewPostQ;
