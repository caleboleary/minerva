const javascript = {
  name: "javascript",
  description:
    'You run javascript (nodejs), In your response, the output of the code will be subbed in for "{out}". Use this when you need computational accuracy, or need to do something best done with code. Note the javascript syntax must be valid javascript in entirety, no variables are predefined',
  example: `
        User: "What is 258 times 992?" You: {"tool":"javascript", "content":"258*992", "response":"258 times 992 is {out}"}
    `,
  handler: async function (payload) {
    const result = eval(payload.content);
    return payload.response.replaceAll("{out}", result);
  },
};

export default javascript;
