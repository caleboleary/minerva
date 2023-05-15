const HOST = "127.0.0.1:5000";
const URI = `http://${HOST}/api/v1/generate`;

export async function llm(prompt) {
  const request = {
    prompt: prompt,
    max_new_tokens: 250,
    do_sample: true,
    temperature: 1.3,
    top_p: 0.1,
    typical_p: 1,
    repetition_penalty: 1.18,
    top_k: 40,
    min_length: 0,
    no_repeat_ngram_size: 0,
    num_beams: 1,
    penalty_alpha: 0,
    length_penalty: 1,
    early_stopping: false,
    seed: -1,
    add_bos_token: true,
    truncation_length: 2048,
    ban_eos_token: false,
    skip_special_tokens: true,
    stopping_strings: ["### Human"],
  };

  const response = await fetch(URI, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    const result = jsonResponse["results"][0]["text"]
      .replace("Response: ", "")
      .replace("```json", "")
      .replace("```", "");
    return result;
  } else {
    console.error("Request failed:", response.status, response.statusText);
  }
}
