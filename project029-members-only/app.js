const express = require("express");
const session = require("express-session");
const authRouter = require("./routes/authentication-routes.js");
const messageRouter = require("./routes/messages-routes.js");
const passport = require("passport");

process.loadEnvFile(".env");

const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.static("./public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);
app.use(passport.session());

require("./config/passport.js");

app.use(messageRouter);
app.use(authRouter);

app.listen(3333, (err) => {
  if (err) throw err;
  console.log("listening on port 3333...");
});
