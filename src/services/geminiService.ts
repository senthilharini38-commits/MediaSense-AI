import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface DiagnosisResult {
  diagnosis: string;
  confidence: number;
  reasoning: string;
  critical: boolean;
  recommendedTests: string[];
}

export interface ClinicalAnalysis {
  potentialDiagnoses: DiagnosisResult[];
  summary: string;
  criticalFlags: string[];
  nextSteps: string[];
}

export async function analyzeClinicalData(data: {
  symptoms: string;
  history: string;
  labs?: string;
  imaging?: string;
}): Promise<ClinicalAnalysis> {
  const prompt = `
    Analyze the following patient data and provide a clinical decision support analysis.
    
    Symptoms: ${data.symptoms}
    Medical History: ${data.history}
    Lab Results: ${data.labs || "Not provided"}
    Imaging Data: ${data.imaging || "Not provided"}
    
    Provide potential diagnoses with confidence scores (0-100), reasoning, whether it's a critical condition, and recommended additional tests.
    Also provide a general summary and specific critical flags if any.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          potentialDiagnoses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                diagnosis: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                reasoning: { type: Type.STRING },
                critical: { type: Type.BOOLEAN },
                recommendedTests: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["diagnosis", "confidence", "reasoning", "critical", "recommendedTests"],
            },
          },
          summary: { type: Type.STRING },
          criticalFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["potentialDiagnoses", "summary", "criticalFlags", "nextSteps"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
