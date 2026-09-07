import Conversation from "../model/conversation.model";

const createConversation = (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = Conversation.create({
      userId: userId,
    });
    return res.status(200).json({ message: "new convo added" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
const getConversation = (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = Conversation.findOne({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json({ message: "new convo added" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
