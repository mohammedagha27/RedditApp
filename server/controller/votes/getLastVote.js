const { getLastVoteQ } = require("../../database/queries/votes");

const getLastVote = (req, res) => {
  const user_id = req.user.id;
  const { post_id } = req.params;
  getLastVoteQ({ post_id, user_id }).then((data) => {
    res.send(data.rows);
  });
};

module.exports = getLastVote;
