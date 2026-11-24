'use client'

import express from "express"
import Groq from "groq-sdk";
import {marked} from "marked";

const app = express()

app.use((req, res) => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
 const aiResponse = chatCompletion.choices[0].message.content;

// Convert Markdown to HTML
const html = marked.parse(aiResponse);

res.send(html);

}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    // max_completion_tokens: 200,
    // temperature: 0.3,
    model: "openai/gpt-oss-20b",
  });
}
main()
})

export default app;