import { GoogleGenerativeAI } from '@google/generative-ai'

const TONE_DESCRIPTIONS = {
  professional: 'formal, polished, traditional vocabulary, business-appropriate',
  confident: 'direct, no fluff, assertive language, strong and commanding',
  warm: 'conversational, personable, human and approachable, friendly but professional',
  concise: 'short sentences, punchy, respects reader\'s time, get to the point',
  enthusiastic: 'genuine excitement, high energy, positive but not cringe'
}

const LENGTH_SPECS = {
  short: '~150 words, 2 paragraphs, tight and focused',
  medium: '~250 words, 3 paragraphs, balanced detail',
  full: '~400 words, 3-4 paragraphs, more context and detail'
}

function buildPrompt({ jd, resume, why, highlight, tone, letterLength }) {
  const toneDesc = TONE_DESCRIPTIONS[tone] || TONE_DESCRIPTIONS.confident
  const lengthSpec = LENGTH_SPECS[letterLength] || LENGTH_SPECS.medium

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

Tone: Write in a ${tone} style. ${toneDesc}

Length: Write approximately ${lengthSpec}.

Write a cover letter following these strict rules:
1. Sound like the candidate wrote it themselves on their best day, not like AI wrote it
2. Paragraph 1: Hook the reader. Connect why THIS company and THIS role excites them specifically — use details from the job description
3. Paragraph 2: Connect 2-3 specific experiences from their resume directly to the key requirements in the job description. Be specific, not vague.
4. Paragraph 3: Confident closing. Express enthusiasm, mention you'd love to discuss further, end strong.
5. Do NOT start with "I am writing to express my interest"
6. Do NOT use any of these phrases: "I am passionate about", "I am a quick learner", "I work well in teams", "synergy", "leverage", "results-driven", "dynamic"
7. Do NOT include a subject line or date or address headers — just the body of the letter starting with "Dear Hiring Manager,"
8. Return only the cover letter text, nothing else. No explanations, no notes, no preamble.`
}

function buildRegeneratePrompt({ jd, resume, why, highlight, tone, letterLength, paragraph, instruction }) {
  const toneDesc = TONE_DESCRIPTIONS[tone] || TONE_DESCRIPTIONS.confident
  const instructionText = instruction === 'concise'
    ? 'Make this paragraph more concise and punchy while keeping the key message.'
    : 'Rewrite this paragraph to better match the overall tone and style.'

  return `You are an expert career coach and professional writer.

Context:
- Job description: ${jd.substring(0, 500)}...
- Resume: ${resume.substring(0, 500)}...
- Why they want the role: ${why}
- What to highlight: ${highlight || 'nothing specific'}
- Tone: ${tone}. ${toneDesc}
- Length: ${LENGTH_SPECS[letterLength] || LENGTH_SPECS.medium}

Current paragraph to rewrite:
---
${paragraph}
---

Task: ${instructionText}

Return ONLY the new paragraph text, nothing else.`
}

export async function callGemini(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function callGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    })
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Groq API error: ${response.status} - ${err}`)
  }
  const data = await response.json()
  return data.choices[0].message.content
}

export async function generateCoverLetter(payload) {
  try {
    const result = await callGroq(buildPrompt(payload))
    return { letter: result, model: 'groq' }
  } catch (error) {
    console.error('Groq error:', error.message)
    throw new Error('Failed to generate cover letter. Please try again.')
  }
}

export async function regenerateParagraph(payload) {
  try {
    return await callGroq(buildRegeneratePrompt(payload))
  } catch (error) {
    console.error('Groq regenerate error:', error.message)
    throw new Error('Failed to regenerate paragraph. Please try again.')
  }
}