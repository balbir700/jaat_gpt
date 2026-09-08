import Conversation from "../model/conversation.model.js";
import Message from "../model/conversation.model.js";
export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = await Conversation.create({
      userId: userId,
    });
    return res.status(200).json({ message: "new convo added" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = await Conversation.findOne({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, { title });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const saveMessages = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    const message = await Message.create({
      conversationId,
      role,
      content,
    });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ message: `message save error ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ message: `message get error ${error}` });
  }
};
