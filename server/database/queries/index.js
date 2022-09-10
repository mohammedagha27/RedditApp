const {
  addNewUserQ,
  getTopUsersQ,
  checkNewUserDataQ,
  loginCheckQ,
} = require("./users");
const {
  getAllPostsQ,
  addNewPostQ,
  addNewPostMediaQ,
  deletePostQ,
} = require("./posts");
const { deleteVoteQ, addVoteQ, getLastVoteQ } = require("./votes");

module.exports = {
  addNewUserQ,
  checkNewUserDataQ,
  loginCheckQ,
  getAllPostsQ,
  deleteVoteQ,
  addVoteQ,
  getLastVoteQ,
  addNewPostQ,
  getTopUsersQ,
  addNewPostMediaQ,
  deletePostQ,
};
