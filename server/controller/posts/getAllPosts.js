const { getAllPostsQ } = require("../../database/queries");
var moment = require("moment"); // require
moment().format();
const getAllPosts = (req, res) => {
  getAllPostsQ().then((data) => {
    res.send(data.rows);
  });
};

module.exports = getAllPosts;
