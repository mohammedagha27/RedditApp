const express = require("express");
const { join } = require("path");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary");
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
  getTopUsers,
  addNewPostMedia,
  cloudUpload,
  localUpload,
  reduceSize,
} = require("../controller");
const { getLoggedUserData } = require("../controller/Authentication");
const { isLogged } = require("../middlewares");
const router = express.Router();

//users
router.get("/topUsers", getTopUsers);

//Authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getLoggedUserData", isLogged, getLoggedUserData);

//posts
const upload = localUpload();
router.get("/posts", getAllPosts);
router.post("/post", isLogged, addNewPost);

router.post(
  "/addNewPostMedia",
  isLogged, //Verify login
  upload.single("media"), //multer upload
  reduceSize, //tinify api
  cloudUpload, //cloudinary upload
  addNewPostMedia //db query
);

router.get("/search", searchPost);
router.delete("/post/:id", deletePost);

//votes
router.post("/vote", isLogged, addVote);
router.get("/vote/:post_id", isLogged, getLastVote);
router.delete("/vote/:post_id", isLogged, deleteVote);

//comments
router.get("/comments", getPostComments);
router.post("/comment", postNewComment);
router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
