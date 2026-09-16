import { api } from "../../utils/axios.js";

async function logOut() {
  try {
    const { data } = api.get("/api/auth/logOut");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default logOut;
