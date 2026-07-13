const path = require("node:path")
const { loadEnvFile } = require("node:process");
loadEnvFile(path.join(__dirname, ".env"));

module.exports = process.env;