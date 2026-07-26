import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let message = "";
    let mode = "Quick";
    let history = [];
    let file = null;
    let useSearch = false; // 🌐 Grounding flag

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      message = formData.get("message") || "";
      mode = formData.get("mode") || "Quick";
      useSearch = formData.get("useSearch") === "true";
      file = formData.get("file");

      const rawHistory = formData.get("history");
      if (rawHistory) {
        try {
          history = JSON.parse(rawHistory);
        } catch (e) {
          console.warn("Failed to parse history JSON:", e);
        }
      }
    } else {
      const body = await req.json();

      if (body.messages && Array.isArray(body.messages)) {
        message = body.messages[body.messages.length - 1]?.content || "";
      } else {
        message = body.message || "";
      }

      mode = body.mode || "Quick";
      useSearch = Boolean(body.useSearch);
      history = body.history || [];
    }

    let role = "";
    switch (mode) {
      case "Study":
        role = "You are a friendly teacher. Explain everything in simple words with examples.";
        break;
      case "Coding":
        role = "You are an expert software engineer. Write clean code and explain it clearly.";
        break;
      case "Translate":
        role = "You are a professional translator. Translate accurately.";
        break;
      case "Flashcards":
        role = "You are an expert AI tutor. Generate structured revision flashcards (Question & Answer format) followed by a 3-question MCQ quiz based on the provided text or document.";
        break;
      case "Writer":
        role = "You are a professional writer. Create engaging and polished content.";
        break;
      case "PDF":
        role = "You are an expert document summarizer. Analyze documents clearly and concisely.";
        break;
      default:
        role = "You are a modern, intelligent AI assistant.";
    }

    const contents = history.map((msg) => ({
      role: msg.sender === "You" ? "user" : "model",
      parts: [{ text: msg.text || "" }],
    }));

    const userParts = [];

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      const mimeType = file.type || "image/png";

      userParts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      });
    }

    userParts.push({
      text: message || (file ? "Describe or analyze this file." : "Hello!"),
    });

    contents.push({
      role: "user",
      parts: userParts,
    });

    const config = {
      systemInstruction: `
You are Auralis AI.
${role}
Always give accurate answers, be friendly, and format using clean markdown.
`,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config,
    });

    const outputText = response.text || "";

    return Response.json({
      reply: outputText,
      text: outputText,
    });
  } catch (error) {
    console.error("API Route Error:", error);

    return Response.json(
      { 
        reply: error.message || "An unexpected server error occurred.",
        text: error.message || "An unexpected server error occurred." 
      },
      { status: error.status || 500 }
    );
  }
}