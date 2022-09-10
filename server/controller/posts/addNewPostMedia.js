const { addNewPostMediaQ } = require("../../database/queries");

const addNewPostMedia = (req, res) => {
  const media = req.mediaUrl;
  const post_id = req.body.post_id;
  addNewPostMediaQ({ media, post_id })
    .then((data) => res.send({ success: "post added" }))
    .catch((err) => {
      res.status(500).json({ msg: "There was an Error,Image Not Uploaded" });
    });
};
module.exports = addNewPostMedia;
