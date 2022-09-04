const signUp = require("./Authentication/signUp");
const login = require("./Authentication/login");
const logout = require("./Authentication/logout");
const searchPost = require("./posts/searchPost");
const getAllPosts = require("./posts/getAllPosts");
const addNewPost = require("./posts/addNewPost");
const getPostComment = require("./comments/getPostComments");
const postNewComment = require("./comments/postNewComment");
const deleteComment = require("./comments/deleteComment");
const deletePost = require("./posts/deletePost");

module.exports = {
  signUp,
  login,
  logout,
  searchPost,
  getAllPosts,
  getPostComment,
  postNewComment,
  addNewPost,
  deleteComment,
  deletePost,
};
