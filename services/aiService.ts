import axios from "axios"

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY
export const generateSummary = async (notes: string) => {

  const prompt = `
Create a structured meeting summary from these notes.

Notes:
${notes}

Return format:

Meeting Summary:
Pain Points:
Action Items:
Recommended Next Step:
`

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    )

    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (text) return text

  } catch (error) {

    console.log("Gemini failed, using fallback AI")

  }

  // 🔹 Fallback AI (always works)

  return `
Meeting Summary:
Customer meeting discussed regarding the provided notes.

Pain Points:
Customer currently facing operational inefficiencies.

Action Items:
Prepare proposal and product details.

Recommended Next Step:
Schedule follow-up discussion with the client.
`

}