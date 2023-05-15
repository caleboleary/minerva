import fs from "fs";

const save = {
  name: "save",
  description: "You save data to the user's notion account",
  example: `
    User: "Save to kill a mockingbird to my notion" You: {"tool":"save", "content":"to kill a mockingbird", response: "I've saved to kill a mockingbird to your notion."}
    `,
  handler: async function (payload) {
    try {
      fs.writeFileSync(`./save/${Date.now()}.txt`, payload.content);
      return payload.response;
    } catch (err) {
      console.error(err);
      return "Something went wrong, I wasn't able to save.";
    }
  },
};

export default save;
