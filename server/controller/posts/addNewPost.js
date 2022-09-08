const { addNewPostQ } = require("../../database/queries");

const addNewPost = (req, res) => {
  const user_id = req.user.id;
  const { title, content } = req.body;
  addNewPostQ({ title, content, user_id })
    .then((data) => res.send({ msg: "post added" }))
    .catch((err) => res.send({ error: "post not added" }));
};

module.exports = addNewPost;
