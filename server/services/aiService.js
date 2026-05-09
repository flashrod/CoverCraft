import { GoogleGenerativeAI } from '@google/generative-ai'
import groq from 'groq'

function buildPrompt({ jd, resume, why, highlight }) {
  return `You are an expert career coach and professional writer.
Your job is to write a compelling, tailored cover letter for a job applicant.

Here is the job description they are applying for:
---
${jd}
---

Here is their resume:
---
${resume}
---

Why they want this specific role:
${why}

Anything specific they want to highlight or include:
${highlight}

Write a cover letter following these strict rules:
1. Maximum 3 paragraphs, under 300 words total
2. Sound warm, confident, and human — like the candidate wrote it themselves on their best day, not like AI wrote it
3. Paragraph 1: Hook the reader. Connect why THIS company and THIS role excites them specifically — use details from the job description
4. Paragraph 2: Connect 2-3 specific experiences from their resume directly to the key requirements in the job description. Be specific, not vague.
5. Paragraph 3: Confident closing. Express enthusiasm, mention you'd love to discuss further, end strong.
6. Do NOT start with "I am writing to express my interest"
7. Do NOT use any of these phrases: "I am passionate about", "I am a quick learner", "I work well in teams", "synergy", "leverage", "results-driven", "dynamic"
8. Do NOT include a subject line or date or address headers — just the body of the letter starting with "Dear Hiring Manager,"
9. Return only the cover letter text, nothing else. No explanations, no notes, no preamble.`
}

export async function callGemini(payload) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const result = await model.generateContent(buildPrompt(payload))
  return result.response.text()
}

export async function callGroq(payload) {
  const client = groq({ apiKey: process.env.GROQ_API_KEY })
  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: buildPrompt(payload) }],
    max_tokens: 1000,
    temperature: 0.7
  })
  return completion.choices[0].message.content
}

export async function generateCoverLetter(payload) {
  try {
    const result = await callGemini(payload)
    return { letter: result, model: 'gemini' }
  } catch (error) {
    console.error('Gemini error:', error.message)
    try {
      const result = await callGroq(payload)
      return { letter: result, model: 'groq' }
    } catch (groqError) {
      console.error('Groq error:', groqError.message)
      throw new Error('Failed to generate cover letter. Please try again.')
    }
  }
}