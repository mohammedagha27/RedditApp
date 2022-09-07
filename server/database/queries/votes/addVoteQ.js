const connection = require("../../config/connection");

const addVoteQ = ({ id, post_id, user_id, vote }) => {
  return connection.query(
    `
    INSERT INTO votes(id, post_id, user_id, vote)
     VALUES ($1, $2, $3, $4)
    ON CONFLICT (id)
     DO UPDATE 
     SET vote = $4
     ;
    `,
    [id, post_id, user_id, vote]
  );
};

module.exports = addVoteQ;
