import { StateGraph } from "@langchain/langgraph";
import { router } from "./router.js";
import { chatAgent } from "../agents/chatAgent.js";
import { codingAgent } from "../agents/codingAgent.js";
import { pptAgent } from "../agents/pptAgent.js";
import { searchAgent } from "../agents/searchAgent.js";
import { pdfAgent } from "../agents/pdfAgent.js";
import { imageAgent } from "../agents/imageAgent.js";

const workflow = new StateGraph();

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("imagine", imageAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    if (state.agent == "chat") {
      return "chat";
    }
    if (state.agent == "coding") {
      return "coding";
    }
    if (state.agent == "ppt") {
      return "ppt";
    }
    if (state.agent == "pdf") {
      return "pdf";
    }
    if (state.agent == "search") {
      return "search";
    }
    if (state.agent == "imagine") {
      return "imagine";
    } else {
      return "chat";
    }
  },
  {
    chat: "chat",
    ppt: "ppt",
    search: "search",
    imagine: "imagine",
    pdf: "pdf",
    coding: "coding",
  },
);
workflow.addEdge("search", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("imagine", "__end__");

export const graph = workflow.compile();
