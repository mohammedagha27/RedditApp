const { addNewPostQ } = require("../../database/queries");

const addNewPost = (req, res) => {
  const user_id = req.user.id;
  const { title, content } = req.body;
  console.log(title);
  addNewPostQ({ title, content, user_id }).then((data) => res.send(data.rows));
};

module.exports = addNewPost;
