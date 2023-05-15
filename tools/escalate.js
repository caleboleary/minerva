import { llm } from "../llms/gpt4.js";

const escalate = {
  name: "escalate",
  description:
    "Your response when you're unsure, you forward the problem to a more powerful but more costly model. Use this when you're unsure how to respond. No content or response are required, leave them blank strings.",
  example: `
        User: "Ancay ouyay underay andstay isthay?" You: {"tool":"escalate", "content":"", "response":""}
    `,
  handler: async function (payload) {
    const escalation = await llm(payload.originalPrompt);
    return escalation;
  },
};

export default escalate;
