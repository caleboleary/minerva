import dotenv from "dotenv";
import { ChatGPTAPI } from "chatgpt";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const model = "gpt-3.5-turbo";

const api = new ChatGPTAPI({
  apiKey: apiKey,
  completionParams: {
    model: model,
  },
});

export async function llm(prompt) {
  const response = await api.sendMessage(prompt);
  return response.text;
}
