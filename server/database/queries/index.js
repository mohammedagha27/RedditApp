const addNewUserQ = require("./addNewUserQ");
const getTopUsersQ = require("./getTopUsersQ");
const checkNewUserDataQ = require("./checkNewUserDataQ");
const loginCheckQ = require("./loginCheckQ");
const { getAllPostsQ, addNewPostQ, addNewPostMediaQ,deletePostQ } = require("./posts");
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
  deletePostQ
};
