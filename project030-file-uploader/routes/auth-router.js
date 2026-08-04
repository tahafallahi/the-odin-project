import { Router } from "express";
import {
  getLoginForm,
  getLogoutForm,
  getRegisterForm,
  logoutUser,
  registerUser,
} from "../controllers/auth-controllers.js";
import passport from "passport";

const router = Router();

router.get("/register", getRegisterForm);
router.post("/register", registerUser);
router.get("/login", getLoginForm);
router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/root" }),
);
router.get("/logout", getLogoutForm);
router.post("/logout", logoutUser);

export default router;
