import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function askAI(systemPrompt, messages) {
  const history = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
${systemPrompt}

Conversation:
${history}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}