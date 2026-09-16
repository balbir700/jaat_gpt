import { getModel } from "../config/llmModels";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const prompt = "you are jaatgpt an intelligent ai assitstent";
  const response = await llm.invoke([
    {
      role: "system",
      content: prompt,
    },
    { role: "human", content: state.prompt },
  ]);
  return {
    ...state,
    aiResponse: response,
  };
};
