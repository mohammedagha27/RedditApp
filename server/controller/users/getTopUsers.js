const { getTopUsersQ } = require("../../database/queries");

const getTopUsers = (req, res) => {
  getTopUsersQ()
    .then((data) => res.send(data.rows))
    .catch((err) => {
      res.status(500).json({
        msg: "Connection Error, Could not Get Top users, Please Try again letter.",
      });
    });
};

module.exports = getTopUsers;
