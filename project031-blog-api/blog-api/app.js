import path from "node:path";
import express from "express";
import cors from "cors";
import { loginUser, registerUser } from "./controllers/auth-controllers.js";
import passport from "passport";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "./controllers/post-controllers.js";
import { requiredRole } from "./middlewares.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "./controllers/comment-controllers.js";

process.loadEnvFile(path.join(import.meta.dirname, "../.env"));

await import("./passport-config.js");

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  requiredRole("ADMIN"),
  createPost,
);
app.get(
  "/posts/:id",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  getPost,
);
app.get(
  "/posts",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  getAllPosts,
);
app.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  requiredRole("ADMIN"),
  updatePost,
);
app.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  requiredRole("ADMIN"),
  deletePost,
);

app.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createComment,
);
app.get("/comments/:id", getComment);
app.get("/comments", getAllComments);
app.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  updateComment,
);
app.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment,
);

app.post("/register", registerUser);
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser,
);

app.listen(3333, (err) => {
  if (err) console.log("you fucked up booooooooi.");
  console.log("listeing on port 3333...");
});
