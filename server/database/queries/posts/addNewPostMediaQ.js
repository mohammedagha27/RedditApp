const connection = require("../../config/connection");

const addNewPostMediaQ = ({ media, post_id }) => {
  return connection.query(
    `update
      posts
     set
      media = $1
     where
      id=$2;
    `,
    [media, post_id]
  );
};

module.exports = addNewPostMediaQ;
