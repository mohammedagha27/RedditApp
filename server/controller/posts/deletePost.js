const { deletePostQ } = require("../../database/queries");

const deletePost = (req, res) => {
  const id = req.params.id;
  deletePostQ(id)
    .then((data) => res.send({ success: "post deleted successfully" }))
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "There was an Error, The post has not been removed." });
    });
};

module.exports = deletePost;
