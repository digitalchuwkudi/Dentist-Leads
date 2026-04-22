import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { contents, systemInstruction } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const captureLeadFunction: FunctionDeclaration = {
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
          tools: [{ functionDeclarations: [captureLeadFunction] }]
        }
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        res.json({ functionCall: response.functionCalls[0] });
      } else {
        res.json({ text: response.text });
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Handling SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
