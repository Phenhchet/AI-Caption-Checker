import { GoogleGenAI, Type } from "@google/genai";
import type { Platform, Feedback } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.INTEGER,
      description: 'A score from 1 to 100 on the caption quality for the specified platform.'
    },
    suggestions: {
      type: Type.OBJECT,
      properties: {
        tone: {
          type: Type.STRING,
          description: 'Feedback on the tone of the caption. Is it appropriate for the platform? Suggest improvements.'
        },
        clarity: {
          type: Type.STRING,
          description: 'Feedback on the clarity and readability of the caption. Is it easy to understand?'
        },
        engagement: {
          type: Type.STRING,
          description: 'Actionable suggestions to improve engagement, like asking questions or adding a strong call-to-action (CTA).'
        },
        hashtags: {
          type: Type.STRING,
          description: 'Feedback on hashtag usage. Suggest relevant and effective hashtags if needed.'
        },
        platformFit: {
          type: Type.STRING,
          description: 'Analysis on how well the caption aligns with the norms and best practices of the selected social media platform.'
        },
        impact: {
            type: Type.STRING,
            description: 'Feedback on how to make the caption stronger, more interesting, and more attention-grabbing.'
        }
      },
      required: ['tone', 'clarity', 'engagement', 'hashtags', 'platformFit', 'impact']
    },
    revisedCaption: {
      type: Type.STRING,
      description: 'An improved, revised version of the original caption that incorporates the suggestions.'
    }
  },
  required: ['overallScore', 'suggestions', 'revisedCaption']
};

export const getCaptionFeedback = async (caption: string, platform: Platform): Promise<Feedback> => {
  const xPlatformNote = platform === 'X'
    ? `For X, it is crucial that the revised caption is concise and respects the character limit (currently 280 characters). Ensure your suggestions and revised caption are optimized for brevity and impact.`
    : '';

  const prompt = `
    Analyze the following social media caption for the platform: ${platform}.
    Caption: "${caption}"

    Provide a detailed analysis based on the platform's best practices. Your response must be in JSON format and adhere to the provided schema.
    Focus on:
    - Overall quality score (1-100).
    - Tone: Is it professional for LinkedIn, casual for Instagram, etc.?
    - Clarity: Is the message clear and concise?
    - Engagement: Does it encourage interaction?
    - Hashtags: Are they relevant and used correctly for the platform?
    - Platform Fit: General alignment with ${platform} culture.
    - Impact: How can the caption be made stronger and more interesting to grab attention?
    - Revised Caption: Provide a rewritten, improved version.

    ${xPlatformNote}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse: Feedback = JSON.parse(jsonText);
    return parsedResponse;

  } catch (error) {
    console.error("Error fetching feedback from Gemini API:", error);
    throw new Error("Failed to get feedback from AI. Please check the console for more details.");
  }
};
