const path = require("node:path");
const express = require("express");
const { router } = require("./routes/routes");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(router);

app.listen(3333, (err) => {
  console.log("Listeing to port 3333");
});
