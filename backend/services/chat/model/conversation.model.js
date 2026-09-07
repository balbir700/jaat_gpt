import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    title: String,
    userId: String,
  },
  {
    timeStamps: true,
  },
);
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
