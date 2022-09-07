const { addVoteQ } = require("../../database/queries/votes");

const addVote = (req, res) => {
  const user_id = req.user.id;
  const { post_id, vote } = req.body;
  const id = post_id + "_" + user_id;
  addVoteQ({ id, post_id, user_id, vote }).then(
    res.send({ success: "vote added" })
  );
};

module.exports = addVote;
