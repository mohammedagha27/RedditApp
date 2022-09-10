const { addNewPostQ } = require("../../database/queries");

const addNewPost = (req, res) => {
  const user_id = req.user.id;
  const { title, content } = req.body;
  addNewPostQ({ title, content, user_id })
    .then((data) => res.send(data.rows))
    .catch((err) => {
      res.status(500).json({ msg: "There was an Error, Post Not Added." });
    });
};

module.exports = addNewPost;
