import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Cemento40 Assistant", an expert AI engineering assistant for Cemento40. 
Cemento40 is a world-class engineering firm for the global cement industry, specializing in plant optimization, structural integrity, automation, and sustainable retrofitting.

Your goal is to assist users (plant managers, engineers, potential clients) by:
1. Explaining Cemento40's services (Process Engineering, Automation, CFD, etc.).
2. Providing high-level technical insights about cement manufacturing (clinker production, kiln efficiency, grinding, etc.).
3. Encouraging users to "Contact Us" or "Request a Consultation" for specific projects.

Keep answers professional, concise, and helpful. If you don't know a specific company detail, generalize based on industry best practices for top-tier engineering firms.
`;

export const getGeminiResponse = async (history: { role: string, parts: { text: string }[] }[], userMessage: string): Promise<string> => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.warn("API Key not found");
            return "I'm sorry, I'm currently offline (API Key missing). Please contact support.";
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // Use a lightweight model for quick chat responses
        const model = 'gemini-3-flash-preview'; 

        const response = await ai.models.generateContent({
            model,
            contents: [
                ...history,
                { role: 'user', parts: [{ text: userMessage }] }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            }
        });

        return response.text || "I didn't quite catch that. Could you rephrase?";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    }
};