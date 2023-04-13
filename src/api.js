import { useMessagesStore } from "./stores/messagesStore";
const chatgptEndpoint = "https://api.openai.com/v1/chat/completions";
const dalleEndpoint = "https://api.openai.com/v1/images/generations";
const apiKey = process.env.VUE_APP_OPENAI_API_KEY;

async function story(prompt) {
  const store = useMessagesStore();
  store.addMessage({ role: "user", content: prompt });

  const data = await chatgpt(store.messages);

  store.addMessage(data.choices[0].message);

  return data;
}

async function chatgpt(messages) {
  const response = await fetch(chatgptEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: messages,
      model: "gpt-3.5-turbo",
    }),
  });

  return await response.json();
}

async function dalle(prompt) {
  const response = await fetch(dalleEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ prompt: prompt.substring(0, 999) }),
  });

  return await response.json();
}

export { chatgpt, story, dalle };
