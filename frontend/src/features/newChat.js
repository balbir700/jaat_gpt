import { api } from "../../utils/axios";
const newChat = async () => {
  try {
    const { data } = await api.get("api/chat/startConversation");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default newChat;
