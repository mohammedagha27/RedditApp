const { checkNewUserDataQ } = require("../../database/queries");

const checkNewUserData = (email, username) => {
  return checkNewUserDataQ(email, username);
};
module.exports = { checkNewUserData };
