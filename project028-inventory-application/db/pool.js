const { Pool } = require("pg");
const globals = require("../settings.js")

const pool = new Pool({
  host: "localhost",
  user: "taha",
  database: globals.DATABASE_NAME,
  port: 5432,
});


module.exports = pool;

