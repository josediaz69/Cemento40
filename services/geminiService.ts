import { GoogleGenAI, Type } from "@google/genai";

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

// Interface for the crawler result
export interface IndustryEntry {
    company: string;
    location: string;
    description: string;
    website?: string;
}

export interface CrawlResult {
    data: IndustryEntry[];
    sources: { title: string; uri: string }[];
}

export const searchColombianCementIndustry = async (): Promise<CrawlResult> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });

    // We use the search tool to act as a "Web Scraper" to find live data
    // Note: googleSearch tool cannot be used with responseSchema/responseMimeType 'application/json'
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Consult the Global Cement Directory and other authoritative industry sources to find a list of cement manufacturing plants and companies in Colombia. For each entry, provide the Company Name, specific Plant Location (City/Department), and a description including production capacity (Mt/yr) or plant type (Integrated vs Grinding). Return the result as a raw JSON array of objects (keys: company, location, description, website). Do not use markdown code blocks.",
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    // Extract sources from grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
        .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
        .filter((s: any) => s !== null);

    // Parse JSON manually since we can't use responseSchema with googleSearch
    let data: IndustryEntry[] = [];
    try {
        let text = response.text || "";
        // Simple cleanup for potential markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        if (text) {
            data = JSON.parse(text);
        }
    } catch (e) {
        console.error("Failed to parse JSON from crawler", e);
    }

    return { data, sources };
};

export interface ProposalResult {
    analysis: string;
    identified_needs: string[];
    email_subject: string;
    email_body: string;
}

export const generateSalesProposal = async (companyName: string, location: string, websiteUrl: string): Promise<ProposalResult> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });

    // Note: googleSearch tool cannot be used with responseSchema/responseMimeType 'application/json'
    // We must prompt for JSON format and parse the text response.
    const prompt = `
        Act as a Senior Business Development Manager for 'Cemento40', an engineering firm specializing in Process Optimization, Automation, and CFD Modeling for the cement industry.
        
        Target Company: ${companyName}
        Location: ${location}
        Website/Context: ${websiteUrl}

        Task:
        1. Search the web for recent news, sustainability reports, or active projects regarding ${companyName} in Colombia (e.g., carbon neutrality goals, capacity expansion, alternative fuels, digital transformation).
        2. Based on findings, identify 2-3 specific technical needs they likely have.
        3. Draft a highly personalized B2B cold email proposing Cemento40's services. Connect our expertise (CFD, Automation, Audits) directly to their specific projects or goals found in step 1.

        Return the response in raw JSON format (no markdown backticks). The JSON object must have these keys:
        {
            "analysis": "A brief summary of what the company is currently doing or focusing on.",
            "identified_needs": ["Need 1", "Need 2"],
            "email_subject": "Subject line",
            "email_body": "The full email body."
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                // Removed responseSchema and responseMimeType as they conflict with googleSearch tool
            }
        });

        let text = response.text || "";
        // Clean up markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(text) as ProposalResult;
    } catch (e) {
        console.error("Proposal Generation Error:", e);
        throw new Error("Failed to generate proposal");
    }
};