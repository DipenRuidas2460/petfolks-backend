const express = require("express");

const router = express.Router();

// ------------------------- Chat Routes -----------------------------------------------------------------------

router.post("/chat", ChatController.accessChat);
router.get("/chat", ChatController.fetchChats);

// ------------------------- Message Routes --------------------------------------------------------------------

router.post("/message", MessageController.sendMessage);
router.get("/message/:chatId", MessageController.allMessages);

module.exports = router;