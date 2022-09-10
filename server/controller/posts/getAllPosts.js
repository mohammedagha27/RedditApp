const { getAllPostsQ } = require("../../database/queries");
var moment = require("moment"); // require
moment().format();
const getAllPosts = (req, res) => {
  getAllPostsQ()
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Connection Error, Could not Get Post, Please Try again letter.",
      });
    });
};

module.exports = getAllPosts;
