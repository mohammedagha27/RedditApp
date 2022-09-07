const connection = require("../../config/connection");

const getLastVoteQ = ({ post_id, user_id }) => {
  return connection.query(
    `
   select * from votes where post_id=$1 and user_id =$2;
    `,
    [post_id, user_id]
  );
};

module.exports = getLastVoteQ;
