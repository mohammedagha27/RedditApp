const { deletePostQ } = require("../../database/queries");

const deletePost = (req, res) => {
  const id = req.params.id;
  deletePostQ(id).then(res.send({ msg: "post deleted successfully" }));
};

module.exports = deletePost;
