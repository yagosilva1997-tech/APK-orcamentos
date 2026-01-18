
import { GoogleGenAI } from "@google/genai";

// Initialize AI strictly with process.env.API_KEY as per Google GenAI SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartQuoteEstimate = async (problemDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O cliente descreveu o seguinte problema elétrico: "${problemDescription}". 
      Como especialista em elétrica, forneça uma breve análise técnica (máximo 3 frases) e uma estimativa de complexidade (Baixa, Média, Alta). 
      Seja profissional e prestativo.`,
      config: {
          systemInstruction: "Você é um assistente técnico da SoS Elétrica, empresa liderada pelo Eng. Yago Silva. Responda de forma sucinta e profissional em português brasileiro."
      }
    });
    // Use .text property to get the generated response
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar estimativa IA:", error);
    return "Não foi possível gerar uma pré-análise automática, mas nossa equipe analisará seu pedido em breve.";
  }
};
