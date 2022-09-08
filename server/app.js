const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = require("./router");
const app = express();
const { join } = require("path");
const { virefyLogin } = require("./middlewares");
app.set("port", 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static("public"));
app.use("/profile", virefyLogin, express.static("private"));
app.use(router);

module.exports = app;
