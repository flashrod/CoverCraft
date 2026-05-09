import pdf from 'pdf-parse'

export async function parsePDF(buffer) {
  try {
    const data = await pdf(buffer)
    return data.text
  } catch (error) {
    throw new Error('Failed to parse PDF. Please try pasting your resume as text instead.')
  }
}