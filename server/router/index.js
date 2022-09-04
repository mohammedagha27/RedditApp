const express = require("express");
const {
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
} = require("../controller");
const router = express.Router();

//Authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
//posts
router.get("/search", searchPost);
router.get("/posts", getAllPosts);
router.post("/post", addNewPost);
router.get("/delete-post/:id", deletePost);
//comments
router.get("/comments", getPostComment);
router.post("/comment", postNewComment);
router.get("/delete-comment/:id", deleteComment);

module.exports = router;
