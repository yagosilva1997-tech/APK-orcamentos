import { GoogleGenAI } from "@google/genai";

// Initialize AI strictly with process.env.API_KEY
// The define in vite.config.ts ensures process.env is available
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getSmartQuoteEstimate = async (problemDescription: string) => {
  try {
    const ai = getAI();
    if (!ai) {
      return "Análise automática temporariamente indisponível. Nossa equipe analisará manualmente.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O cliente descreveu o seguinte problema elétrico: "${problemDescription}". 
      Como especialista em elétrica, forneça uma breve análise técnica (máximo 3 frases) e uma estimativa de complexidade (Baixa, Média, Alta). 
      Seja profissional e prestativo.`,
      config: {
          systemInstruction: "Você é um assistente técnico da SoS Elétrica, empresa liderada pelo Eng. Yago Silva. Responda de forma sucinta e profissional em português brasileiro."
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar estimativa IA:", error);
    return "Não foi possível gerar uma pré-análise automática, mas nossa equipe analisará seu pedido em breve.";
  }
};