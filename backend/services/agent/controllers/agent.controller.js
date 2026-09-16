import { graph } from "../graph/graph";

export const agentController = async (req, res) => {
  try {
    const { conversationId, prompt } = req.body;
    await axios.post(`${process.env.CHAT_SERVICE}/save-messages`, {
      conversationId,
      role: "human",
      content: prompt,
    });
    const result = await graph.invoke({
      conversationId,
      prompt,
    });
    const response = result.aiResponse;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: `error ${error}` });
  }
};
