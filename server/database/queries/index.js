const addNewUserQ = require("./addNewUserQ");
const checkNewUserDataQ = require("./checkNewUserDataQ");
const loginCheckQ = require("./loginCheckQ");
const { getAllPostsQ } = require("./posts");
const { deleteVoteQ, addVoteQ, getLastVoteQ } = require("./votes");

module.exports = {
  addNewUserQ,
  checkNewUserDataQ,
  loginCheckQ,
  getAllPostsQ,
  deleteVoteQ,
  addVoteQ,
  getLastVoteQ,
};
