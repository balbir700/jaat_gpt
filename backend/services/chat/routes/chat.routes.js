import express from "express";
import {
  createConversation,
  getConversations,
  getMessages,
  saveMessages,
  updateConversation,
} from "../controllers/chat.controller";
const router = express.Router();

router.get("/createConversation", createConversation);
router.get("/getconversation", getConversations);
router.post("/updateConversation", updateConversation);
router.post("save-message", saveMessages);
router.get("get-message/:conversationId", getMessages);
export default router;
