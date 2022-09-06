const { getAllPostsQ } = require("../../database/queries");

const getAllPosts = (req, res) => {
  getAllPostsQ().then((data) => res.send(data.rows));
};

module.exports = getAllPosts;
