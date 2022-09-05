const getLoggedUserData = (req, res) => {
  res.send(req.user);
};

module.exports = getLoggedUserData;
