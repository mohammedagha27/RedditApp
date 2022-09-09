const express = require("express");
const { join } = require("path");
const fs = require("fs");
const multer = require("multer");
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
} = require("../controller");
const { getLoggedUserData } = require("../controller/Authentication");
const { isLogged } = require("../middlewares");
const router = express.Router();

//? to create the images file if not exist
const dir = join(__dirname, "..", "..", "public", "uploads", "images");
!fs.existsSync(dir) && fs.mkdirSync(dir);
const fileStorage = multer.diskStorage({
  //* the directory where the file will be stored.
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  //* the new name that will be given to the file before storing it.
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

//users
router.get("/topUsers", getTopUsers);
//Authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getLoggedUserData", isLogged, getLoggedUserData);
//posts
router.get("/posts", getAllPosts);
router.post("/post", isLogged, addNewPost);
router.post(
  "/addNewPostMedia",
  isLogged,
  upload.single("media"),
  addNewPostMedia
);
router.get("/search", searchPost);
router.delete("/post/:id", deletePost);
//comments
router.get("/comments", getPostComments);
router.post("/comment", postNewComment);
router.delete("/delete-comment/:id", deleteComment);
//votes
router.post("/vote", isLogged, addVote);
router.get("/vote/:post_id", isLogged, getLastVote);
router.delete("/vote/:post_id", isLogged, deleteVote);

module.exports = router;
