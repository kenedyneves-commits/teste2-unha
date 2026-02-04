
import { GoogleGenAI } from "@google/genai";

export async function getBeautyAdvice(userQuery: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: "Você é uma consultora de beleza especialista em unhas (Nail Expert). Seu objetivo é ajudar clientes a escolherem cores de esmalte, estilos de nail art e dar dicas de cuidados. Seja simpática, use emojis e foque em tendências de 2024/2025. Se o usuário perguntar sobre produtos, mencione que temos esmaltes gel, kits de pincéis e cabines UV no site.",
      },
    });

    return response.text || "Desculpe, tive um problema para processar seu conselho de beleza. Tente novamente!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao conectar com a Consultora de IA. Verifique sua conexão.";
  }
}
