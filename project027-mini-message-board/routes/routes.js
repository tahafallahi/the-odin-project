const express = require("express");
const {
  getMessages,
  getMessageForm,
  createMessage,
} = require("../controllers/controllers");

const router = express.Router();

router.get("/", getMessages);
router.get("/new", getMessageForm);
router.post("/new", createMessage);

module.exports = { router };
