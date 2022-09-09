const { addNewPostMediaQ } = require("../../database/queries");

const addNewPostMedia = (req, res) => {
  const media = req.file.filename;
  const post_id = req.body.post_id;
  addNewPostMediaQ({ media, post_id })
    .then((data) => res.send({ msg: "post added" }))
    .catch((err) => res.send({ error: "post not added" }));
};
module.exports = addNewPostMedia;
