const { login, logout, signUp } = require("./Authentication");
const { postNewComment, getPostComments, deleteComment } = require("./comments");
const { searchPost, getAllPosts, deletePost, addNewPost, addNewPostMedia} = require("./posts");
const { addVote,getLastVote,deleteVote} = require("./votes");
const { getTopUsers} = require("./users");

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
  getLastVote,
  deleteVote,
  getTopUsers,
  addNewPostMedia
};
