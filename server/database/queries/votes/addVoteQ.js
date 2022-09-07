const connection = require("../../config/connection");

const addVoteQ = ({ post_id, user_id, vote }) => {
  return connection.query(
    `
    INSERT INTO votes(post_id, user_id, vote)
     VALUES ($1, $2, $3);
    `,
    [post_id, user_id, vote]
  );
};

module.exports = addVoteQ;
