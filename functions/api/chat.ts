import { GoogleGenAI, Type } from '@google/genai';

export async function onRequestPost({ request, env }: any) {
  try {
    const { contents, systemInstruction } = await request.json();
    
    // Cloudflare securely injects this from your dashboard variables!
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured in Cloudflare." }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const captureLeadFunction = {
      name: "captureLead",
      description: "Capture the user's contact information when they ask to be contacted by a specialist, and sends an email to the business owner.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the user" },
          contactInfo: { type: Type.STRING, description: "The user's email address or phone number" },
          inquirySummary: { type: Type.STRING, description: "A brief summary of what the user is looking for" }
        },
        required: ["name", "contactInfo", "inquirySummary"]
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [captureLeadFunction as any] }]
      }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      return new Response(JSON.stringify({ functionCall: response.functionCalls[0] }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ text: response.text }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
