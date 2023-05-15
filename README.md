# [WIP] Minerva Assistant

## Description

This is mostly just a proof-of-concept of an idea for a tool-using LLM system with escalating models, but I slapped my code into gpt4 and asked for a readme, here it is with some editing:

The Minerva Assistant is a system that utilizes different language learning models (LLMs) to process and respond to user prompts, with a focus on tool-use. It starts with the most cost-effective model and progressively escalates to more complex (and expensive) models if the simpler ones fail to provide a satisfactory response.

The models used in this project include:

- OpenAI's GPT-4
- GPT-3.5 Turbo
- Open source oobabooga running [GPT4-X-Alpasta-30b-4bit](https://huggingface.co/MetaIX/GPT4-X-Alpasta-30b-4bit) with api open

The system is designed to be flexible, allowing users to add or remove models based on their requirements.

## Features

1. **Flexible Model Escalation:** The system attempts to solve prompts starting from the simplest and cheapest model, escalating to more complex models only when necessary.
2. **Modular Tool Integration:** The system integrates with a variety of tools that the LLMs can utilize to perform tasks.
3. **Error Handling:** The system is robust, handling errors and continuing with the next model if one fails.
4. **JSON Format Responses:** The system demands all responses in a JSON format with specific fields, ensuring a standardized response structure.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Set up your escalation path and write a prompt - you'll have to edit index.js for now
4. Run `node index.js` to start the application.

## Usage

Each time you run it, the prompts are processed through a series of LLMs starting from the simplest. If a satisfactory response is not achieved, or there are errors, the system escalates the prompt to the next LLM.

Sample prompts include:

```js
const prompt =
  "I have a riddle for you, maybe sort of a trick question. If it took 5 hours to dry 5 clothes outside on the line, how long would it take for 30 clothes to dry?";
const prompt = "What is the square root of 123123";
const prompt = "Save a reminder to take out the trash";
const prompt = "What is the most populous country in the world?";
```

These are designed to try and test the escalation, javascript, save, and text tools I've done so far, in that order, though the first one is finnicky and you may need to add in "you should escalate this" haha.

## Extending the System

To add more tools or LLMs to the system, follow these steps:

1. **For tools:** Add a new tool module to the `tools` directory. The tool module must have a `name`, `description`, `example`, and a `handler` function. The `handler` function will be invoked with the tool's `content` and `response` fields from the JSON response.

2. **For LLMs:** Add a new LLM module to the `llms` directory. The module should export a function that takes a prompt and returns a response string.

Then, update the `escalationPath` in `index.js` to include the new LLM module.

## Known Issues

1. The JSON response format must be strictly adhered to. Any deviation from the prescribed format will result in an error.
2. In case of an error, the system will simply print it to the console and move on to the next model in the escalation path.

## Future Work

- Improve error handling to provide more context about what went wrong and potentially offer recovery options.
- Integrate more LLMs and tools to make the system more versatile.
- Implement a user interface for easier interaction with the system.
- Create a LORA trained on the format for the best model I can run locally, [info](https://github.com/oobabooga/text-generation-webui/blob/main/docs/Training-LoRAs.md)
- TTS?
- More tools, google something and try to rip answer from first result, wolfram?
