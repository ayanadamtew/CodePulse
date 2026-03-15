// services/aiService.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv'; // Make sure to import dotenv if you haven't already in your main server file

dotenv.config(); // Load environment variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("CRITICAL: GEMINI_API_KEY is not set in .env file. AI Help will not function.");
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const generationConfig = {
  temperature: 0.6, // Slightly lower for more focused coding help
  topK: 1,
  topP: 1,
  maxOutputTokens: 600, // Increased slightly for potentially longer explanations
};

export async function generateProblemSummary(problem) {
  if (!model) {
    console.error("Gemini model not initialized.");
    return "Summary unavailable.";
  }

  try {
    const prompt = `Provide a very concise (max 3 sentences) summary of the following coding problem for a user who is about to start solving it. Highlight the core challenge.
    
    Title: ${problem.title || 'Untitled'}
    Statement: ${problem.statement || 'No statement provided.'}
    ${Array.isArray(problem.constraints) && problem.constraints.length > 0 ? `Constraints: ${problem.constraints.join(', ')}` : ''}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error generating problem summary:", error);
    return "I'm ready to help you with this problem! What would you like to know?";
  }
}

export async function getAIHelp(problem, userQuery, conversationHistory = [], currentCode = "") {
  if (!genAI) {
    console.error("Gemini AI not initialized.");
    return "I'm sorry, the AI assistant is currently unavailable.";
  }

  try {
    const systemInstruction = `You are CodePulse AI, a specialized programming assistant.
Your primary role is to help users understand and solve coding problems.
- When a user asks for a hint, provide a conceptual nudge or suggest an approach without giving away the direct solution or code.
- If a user provides code and asks for debugging help, analyze their code and point out potential logical errors, syntax issues, or suggest improvements. Explain *why* something might be an issue.
- If a user asks for an explanation of a concept related to the problem, explain it clearly and concisely.
- If a user asks for the solution, politely decline and reiterate your role is to guide them, not solve it for them.
- Format code snippets using markdown (e.g., \`\`\`python ... \`\`\`).
- Be encouraging and supportive.

Problem Context:
Title: ${problem.title || 'Untitled'}
Statement: ${problem.statement || 'No statement provided.'}
${Array.isArray(problem.constraints) && problem.constraints.length > 0 ? `Constraints: ${problem.constraints.join(', ')}` : ''}
${Array.isArray(problem.examples) && problem.examples.length > 0 ? `Example 1 Input: ${problem.examples[0].input}\nExample 1 Output: ${problem.examples[0].output}` : ''}`;

    // Initialize model with system instruction
    const chatModel = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction
    });

    // Format history for Gemini
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = chatModel.startChat({
      history: history,
      generationConfig,
      safetySettings,
    });

    const currentUserMessageContent = `Current user code (if any):\n\`\`\`\n${currentCode || 'No code provided.'}\n\`\`\`\n\nUser's question: ${userQuery}`;

    const result = await chat.sendMessage(currentUserMessageContent);
    const response = result.response;

    if (!response || !result.response.text()) {
      throw new Error("Empty response from Gemini");
    }

    return response.text();
  } catch (error) {
    console.error('Gemini AI help error:', error);
    if (error.message?.includes("API key not valid")) {
      return "AI configuration error: Invalid API Key.";
    }
    return "I encountered an error while processing your request. Please try again later.";
  }
}