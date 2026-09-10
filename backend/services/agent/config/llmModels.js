import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";
const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const gemini = new ChatGoogle({
  apiKey: "your-api-key",
  model: "gemini-3.7-flash",
});

export const getModel = async (agent) => {
  if (agent == coding) {
    return gemini;
  } else {
    return groq;
  }
};
