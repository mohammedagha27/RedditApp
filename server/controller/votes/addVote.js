const { addVoteQ } = require("../../database/queries/votes");

const addVote = (req, res) => {
  const user_id = req.user.id;
  const { post_id, vote } = req.body;
  const id = post_id + "_" + user_id;
  addVoteQ({ id, post_id, user_id, vote })
    .then((data) => res.send({ success: "vote added" }))
    .catch((err) => {
      res.status(400).json({ msg: "Error, vote Not Added" });
    });
};

module.exports = addVote;
