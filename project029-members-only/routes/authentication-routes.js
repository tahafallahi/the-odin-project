const passport = require("passport");
const { Router } = require("express");
const {
  getRegisterForm,
  getLoginForm,
  registerUser,
  getMemberPage,
  upgradeUserToMember,
} = require("../controllers/authentication-controllers");

const router = Router();

router.get("/register", getRegisterForm);
router.post("/register", registerUser);
router.get("/login", getLoginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
  }),
);
router.get("/member", getMemberPage);
router.post("/member", upgradeUserToMember);

module.exports = router;
