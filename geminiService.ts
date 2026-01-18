import { GoogleGenAI } from "@google/genai";

export const getSmartQuoteEstimate = async (problemDescription: string) => {
  try {
    // Usamos process.env.API_KEY que será substituído pelo Vite no build
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === '') {
      console.warn("API_KEY não configurada.");
      return "Análise automática temporariamente indisponível. Nossa equipe analisará manualmente.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
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