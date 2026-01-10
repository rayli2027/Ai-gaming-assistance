
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async getChatResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are LevelUp AI, a world-class gaming expert. You provide detailed, accurate tips for problem solving (puzzles, level navigation, boss fights) and high-level competitive strategies (meta shifts, builds, tactical positioning). Keep responses concise but information-dense. Use Markdown.",
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  }

  async analyzeScreenshot(imageData: string, prompt: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/png' } },
          { text: prompt || "Analyze this game screen. What should I do next? Identify enemies, puzzles, or critical UI elements." }
        ]
      }
    });
    return response.text;
  }

  async getCompetitiveMeta(game: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a current meta-analysis for "${game}". Include a brief tier list and win rate estimates. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gameName: { type: Type.STRING },
            tierList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rank: { type: Type.STRING },
                  character: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["rank", "character", "reason"]
              }
            },
            winRates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                },
                required: ["name", "value"]
              }
            }
          },
          required: ["gameName", "tierList", "winRates"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
}

export const gemini = new GeminiService();
