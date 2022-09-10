const express = require("express");
const {
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
router.delete("/post/:id", isLogged, deletePost);

//votes
router.post("/vote", isLogged, addVote);
router.get("/vote/:post_id", isLogged, getLastVote);
router.delete("/vote/:post_id", isLogged, deleteVote);

//Errors
router.use("/unauthorized", unauthorized);
router.use(notFound);
router.use(serverError);

module.exports = router;
