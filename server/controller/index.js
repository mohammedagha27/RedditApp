const { login, logout, signUp } = require("./Authentication");
const {
  searchPost,
  getAllPosts,
  deletePost,
  addNewPost,
  addNewPostMedia,
  getUserPosts
} = require("./posts");
const { addVote, getLastVote, deleteVote } = require("./votes");
const { getTopUsers } = require("./users");
const { cloudUpload, localUpload, reduceSize } = require("./uploads");
const { notFound, serverError, unauthorized } = require("./errors");

module.exports = {
  signUp,
  login,
  logout,
  searchPost,
  getAllPosts,
  addNewPost,
  deletePost,
  addVote,
  getLastVote,
  deleteVote,
  getTopUsers,
  addNewPostMedia,
  cloudUpload,
  localUpload,
  reduceSize,
  notFound,
  serverError,
  unauthorized,
  getUserPosts
};
