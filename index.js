import { getModules } from "./tools/index.js";

import { llm as oob } from "./llms/local-oobabooga.js";
import { llm as gpt35turbo } from "./llms/gpt35turbo.js";
import { llm as gpt4 } from "./llms/gpt4.js";

import basePrompt from "./basePrompt.js";

const escalationPath = [
  { llm: oob, name: "oobabooga" },
  { llm: oob, name: "oobabooga" },
  { llm: oob, name: "oobabooga" },
  { llm: gpt35turbo, name: "gpt-3.5-turbo" },
  { llm: gpt35turbo, name: "gpt-3.5-turbo" },
  { llm: gpt4, name: "gpt-4" },
];

const parseResponse = (response, tools) => {
  try {
    const parsed = JSON.parse(response);
    if (!parsed.tool) {
      throw new Error("No tool provided");
    }
    if (!tools.find((tool) => tool.default.name === parsed.tool)) {
      throw new Error("Tool not found");
    }

    return parsed;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const attemptInference = async (prompt, llm, tools) => {
  try {
    const response = await llm(prompt);
    const parsed = parseResponse(response, tools);
    return parsed;
  } catch (err) {
    console.error(err);
    return false;
  }
};

async function run(prompt) {
  const tools = await getModules();

  const constructedPrompt = basePrompt
    .replace("{prompt}", prompt)
    .replace(
      "{tools}",
      tools
        .map(
          (tool) =>
            `Tool: ${tool.default.name}\nDescription: ${tool.default.description}\nExample: ${tool.default.example}`
        )
        .join("\n\n")
    )
    .replace("{tools}", tools.map((tool) => tool.default.name).join(", "));

  let result = null;
  for (const llm of escalationPath) {
    try {
      const response = await attemptInference(
        constructedPrompt,
        llm.llm,
        tools
      );

      console.log(response);

      if (!response) continue;

      const selectedTool = tools.find(
        (tool) => tool.default.name === response.tool
      );

      result = await selectedTool.default.handler({
        ...response,
        originalPrompt: prompt,
      });

      console.log(result, llm.name);

      if (result) break;
    } catch (err) {
      console.error(err);
      continue;
    }
  }
}

// const prompt =
// "I have a riddle for you, maybe sort of a trick question. If it took 5 hours to dry 5 clothes outside on the line, how long would it take for 30 clothes to dry?";
// const prompt = "What is the square root of 123123";
// const prompt = "Save a reminder to take out the trash";
const prompt = "What is the most populous country in the world?";
run(prompt);
