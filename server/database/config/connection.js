const { Pool } = require("pg");
require("dotenv").config();

const { NODE_ENV } = process.env;
let dbUrl = "";

if (NODE_ENV === "production") {
  dbUrl = process.env.DATABASE_URL;
} else if (NODE_ENV === "development") {
  dbUrl = process.env.DEV_DB_URL;
} else if (NODE_ENV === "test") {
  dbUrl = process.env.TEST_DB_URL;
} else {
  throw new Error("Invalid database Url");
}

const connection = new Pool({
  connectionString: dbUrl,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = connection;
