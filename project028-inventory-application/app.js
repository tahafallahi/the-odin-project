const path = require("node:path");
const express = require("express");
const itemsRouter = require("./routes/item-routes.js");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.use("/item/", itemsRouter);

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
