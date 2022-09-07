const { deleteVoteQ } = require("../../database/queries");

const deleteVote = (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.post_id;
  deleteVoteQ({ post_id, user_id })
    .then(res.send({ success: "vote deleted" }))
    .catch((err) => console.log(err));
};
module.exports = deleteVote;
