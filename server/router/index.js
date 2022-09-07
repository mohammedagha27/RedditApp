const express = require("express");
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
router.post("/post", addNewPost);
router.get("/search", searchPost);
router.get("/delete-post/:id", deletePost);
//comments
router.get("/comments", getPostComments);
router.post("/comment", postNewComment);
router.get("/delete-comment/:id", deleteComment);
//votes
router.post("/vote", isLogged, addVote);

module.exports = router;
