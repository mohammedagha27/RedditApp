const { getTopUsersQ } = require("../../database/queries");

const getTopUsers = (req, res) => {
  getTopUsersQ().then((data) => res.send(data.rows));
};

module.exports = getTopUsers;
