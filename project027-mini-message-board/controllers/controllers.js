const messages = [
  {
    user: "John Doe",
    text: "Hello, take it and roll it into your pipe.",
    createAt: new Date(),
  },
  {
    user: "John Doe",
    text: "Hello, take it and roll it into your pipe.",
    createAt: new Date(),
  },
];

function getMessages(req, res) {
  res.render("index", { messages });
}

function getMessageForm(req, res) {
  res.render("messageForm");
}

function createMessage(req, res) {
  messages.push({ user: req.body.messageUser, text: req.body.messageText });
  res.redirect("/");
}

module.exports = { getMessages, getMessageForm, createMessage };
