const connection = require("../../config/connection");

const deleteVoteQ = ({ post_id, user_id }) => {
  return connection.query(
    `
    delete from votes where post_id = $1 and user_id= $2;
     ;
    `,
    [post_id, user_id]
  );
};

module.exports = deleteVoteQ;
