const text = {
  name: "text",
  description:
    "You respond with text to the user. When using the Text tool, no response is needed, as the content is the response",
  example: `
        User: "How are you?" You: "{"tool":"text", "content":"I'm doing well, thanks!", response: ""}
    `,
  handler: async function (payload) {
    return payload.content === "" || !payload.content
      ? payload.response
      : payload.content;
  },
};

export default text;
