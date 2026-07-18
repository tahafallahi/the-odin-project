const bcrypt = require("bcrypt");
const db = require("../database/queries.js");

function getRegisterForm(req, res) {
  res.render("signup-form");
}

async function registerUser(req, res) {
  const hash = await bcrypt.hash(req.body.password, 12);
  db.createUser({
    email: req.body.email,
    fullname: req.body.fullname,
    hash: hash,
  });
  res.redirect("/messages");
}

function getLoginForm(req, res) {
  res.render("login-form");
}

function getMemberPage(req, res) {
  res.render("member-page", { user: req.user });
}

async function upgradeUserToMember(req, res) {
  const user = req.user;
  const secret = process.env.CLUB_SECRET;
  if (req.body.secret == secret) {
    db.updateUser({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      is_member: true,
      is_admin: user.is_admin,
    });
    res.redirect("/");
  } else {
    res.send("WRONG SECRET.");
  }
}

module.exports = {
  getRegisterForm,
  registerUser,
  getLoginForm,
  getMemberPage,
  upgradeUserToMember,
};
