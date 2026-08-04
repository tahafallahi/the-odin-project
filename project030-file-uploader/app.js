import express from "express";
import passport from "passport";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import { prisma } from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import "./config/passport.js";

import authRouter from "./routes/auth-router.js";
import fileRouter from "./routes/file-router.js";
import folderRouter from "./routes/folder-router.js";

process.loadEnvFile();

const app = express();

app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: Number(process.env.COOKIE_MAX_AGE),
    },
  }),
);
app.use(passport.session());

app.all("/", (req, res) => res.redirect("/root"));
app.use(authRouter);
app.use(folderRouter);
app.use("/file", fileRouter);

app.listen(3333, (err) => {
  if (err) throw err;
  console.log("listening on port 3333...");
});
