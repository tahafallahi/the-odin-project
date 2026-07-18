const { Router } = require("express");
const {
  getMessages,
  getMessageForm,
  createMessage,
} = require("../controllers/messages-controllers");

const router = Router();

router.get("/", getMessages);
router.get("/create", getMessageForm);
router.post("/create", createMessage);

module.exports = router;
