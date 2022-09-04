const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = require("./router");
const app = express();
const { join } = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(join(__dirname, "..", "public")));
app.use(router);

module.exports = app;
