const express = require("express");
const { join } = require("path");
const {
  signUp,
  login,
  logout,
  searchPost,
  getAllPosts,
  postNewComment,
  addNewPost,
  deleteComment,
  deletePost,
  getPostComments,
  addVote,
  getLastVote,
  deleteVote,
} = require("../controller");
const { getLoggedUserData } = require("../controller/Authentication");
const { isLogged } = require("../middlewares");
const router = express.Router();

//Authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getLoggedUserData", isLogged, getLoggedUserData);
//posts
router.get("/posts", getAllPosts);
router.post("/post", isLogged, addNewPost);
router.get("/search", searchPost);
router.get("/delete-post/:id", deletePost);
//comments
router.get("/comments", getPostComments);
router.post("/comment", postNewComment);
router.get("/delete-comment/:id", deleteComment);
//votes
router.post("/vote", isLogged, addVote);
router.get("/vote/:post_id", isLogged, getLastVote);
router.delete("/vote/:post_id", isLogged, deleteVote);

module.exports = router;
