const { readFileSync } = require("fs");
const { join } = require("path");
const connection = require("./connection");

const build = () => {
  const sql = readFileSync(join(__dirname, "init.sql")).toString();

  return connection.query(sql);
};

// build()
//   .then(console.log("database initialized successfully"))
//   .catch((err) => console.log(err));

module.exports = build;
