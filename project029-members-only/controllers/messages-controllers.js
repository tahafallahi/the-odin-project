const db = require("../database/queries.js");

async function getMessages(req, res) {
  const messages = await db.getMessages();
  res.render("message-board", { messages, user: req.user });
}

async function getMessageForm(req, res) {
  if (!req.user) {
    res.status(403).send("Forbidden");
  } else {
    res.render("message-form");
  }
}

async function createMessage(req, res) {
  if (!req.user) {
    res.status(403);
  } else {
    db.createMessage({
      title: req.body.title,
      text: req.body.text,
      authorId: req.user.id,
    });
    res.redirect("/");
  }
}

module.exports = { getMessages, getMessageForm, createMessage };
