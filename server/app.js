const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = require("./router");
const app = express();
const { join } = require("path");

app.set('port', 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static('public'));
app.use(router);

module.exports = app;
