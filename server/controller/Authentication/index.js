const generateToken = require("./generateToken");
const login = require("./login");
const logout = require("./logout");
const signUp = require("./signUp");
const getLoggedUserData = require("./getLoggedUserData");

module.exports = { generateToken, login, logout, signUp, getLoggedUserData };
