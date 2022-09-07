const { login, logout, signUp } = require("./Authentication");
const { postNewComment, getPostComments, deleteComment } = require("./comments");
const { searchPost, getAllPosts, deletePost, addNewPost } = require("./posts");
const { addVote,getLastVote} = require("./votes");

module.exports = {
  signUp,
  login,
  logout,
  searchPost,
  getAllPosts,
  getPostComments,
  postNewComment,
  addNewPost,
  deleteComment,
  deletePost,
  addVote,
  getLastVote
};
