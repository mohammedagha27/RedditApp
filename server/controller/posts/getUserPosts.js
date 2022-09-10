const { getUserPostsQ } = require("../../database/queries/posts");

const getUserPosts = (req, res) => {
  const user_id = req.user.id;
  getUserPostsQ(user_id).then((data) => res.send(data.rows));
};
module.exports = getUserPosts;
