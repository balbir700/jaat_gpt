import { api } from "../../utils/axios";
const getconversation = async () => {
  try {
    const { data } = await api.get("api/chat/getconversation");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getconversation;
