import { prisma } from "../lib/prisma.js";
import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";

export function getRegisterForm(req, res) {
  res.render("register-form", {
    selected: "register",
    user: req.user,
  });
}

const registerFormValidators = [
  body("username").trim().notEmpty().isLength({ min: 3 }),
  body("password").trim().notEmpty().isLength({ min: 10 }),
];

export const registerUser = [
  registerFormValidators,
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errorMessage = errors
        .array()
        .map((e) => e.msg)
        .join(" ");
      return getRegisterForm(req, res);
    }
    const { username, password } = matchedData(req);

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      res.locals.errorMessage =
        "There is a user with the same username, please try a diffrent username.";
      return getRegisterForm(req, res);
    }

    const hash = await bcrypt.hash(password, Number(process.env.HASH_ROUNDS));
    await prisma.user.create({ data: { username, hashed_password: hash } });

    next();
  },
  passport.authenticate("local", { successRedirect: "/root" }),
];

export function getLoginForm(req, res) {
  // res.locals.layout = "auth-layout";
  res.render("login-form", { selected: "login", user: req.user });
}

export function getLogoutForm(req, res) {
  res.render("logout-form", { selected: "logout", user: req.user });
}

export function logoutUser(req, res) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/root");
  });
}
