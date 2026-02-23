
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

const SYSTEM_INSTRUCTION = `
You are an expert industrial engineering assistant for Cemento40, a global leader in cement and mining engineering.
Your tone is professional, technical, yet helpful and concise.
You specialize in:
- Process Engineering (Mass balance, kiln optimization, grinding efficiency).
- CFD Modeling (OpenFOAM, combustion, cyclones, pneumatic transport).
- Automation (DCS, PLC, HMI/SCADA).
- Electrical Engineering (Substations, CCMs, Arc Flash studies).
- Control Engineering (PID tuning, APC, predictive strategies).
- Re-engineering (3D scanning, As-Built documentation).

If a user asks about services, refer to Cemento40's specific offerings. 
Always encourage them to request a technical meeting or a quote for complex projects.
Answer in Spanish as the primary language.
`;

let chatInstance: Chat | null = null;

export const getGeminiChat = () => {
  if (!chatInstance) {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatInstance = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const sendMessage = async (message: string) => {
  const chat = getGeminiChat();
  const result = await chat.sendMessage({ message });
  return result.text;
};

export const generateProposal = async (plantName: string, company: string, focusArea: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Redacta una propuesta técnica comercial personalizada para la planta cementera ${plantName} de la empresa ${company} en Colombia.
  El enfoque principal debe ser: ${focusArea}.
  Menciona el uso de OpenFOAM para modelamiento CFD (combustión, ciclones o transporte neumático según aplique).
  Usa un tono de Ingeniero a Ingeniero (Senior level). 
  Estructura el correo con: Asunto profesional, Saludo técnico, Desafío identificado, Nuestra Solución con Cemento40 y llamado a la acción para una reunión técnica.
  Sé conciso pero muy convincente técnicamente.`;

  const result = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.8,
      systemInstruction: SYSTEM_INSTRUCTION
    }
  });
  
  return result.text;
};
