import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function generateLetter({ jd, resume, resumeFile, why, highlight, canGenerate, useCredit, isSignedIn }) {
  if (!canGenerate) {
    throw new Error('No credits remaining')
  }

  const formData = new FormData()
  formData.append('jd', jd)
  formData.append('why', why)
  formData.append('highlight', highlight || '')

  if (resumeFile) {
    formData.append('resume', resumeFile)
  } else if (resume) {
    formData.append('resumeText', resume)
  }

  const response = await axios.post(`${API_URL}/api/generate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (!isSignedIn && useCredit) {
    useCredit()
  }

  return response.data
}