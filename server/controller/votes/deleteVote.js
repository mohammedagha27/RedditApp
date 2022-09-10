const { deleteVoteQ } = require("../../database/queries");

const deleteVote = (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.post_id;
  deleteVoteQ({ post_id, user_id })
    .then((data) => res.send({ success: "vote removed" }))
    .catch((err) => {
      res
        .status(400)
        .json({ msg: "There was an Error,The Vote has not been removed." });
    });
};
module.exports = deleteVote;
