const { getUserByEmailQ } = require("../../database/queries");

const checkNewUserEmail = (email) => {
  return getUserByEmailQ(email).then((data) => {
    if (data.rowCount === 0) {
      return "Not found";
    } else {
      return "found";
    }
  });
};
module.exports = checkNewUserEmail;
