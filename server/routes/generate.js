import express from 'express'
import uploadMiddleware from '../middleware/upload.js'
import { parsePDF } from '../services/pdfParser.js'
import { generateCoverLetter } from '../services/aiService.js'
import Letter from '../models/Letter.js'

const router = express.Router()

router.post('/generate', uploadMiddleware.single('resume'), async (req, res) => {
  try {
    const { jd, why, highlight, resumeText } = req.body
    let resume = ''

    if (req.file) {
      resume = await parsePDF(req.file.buffer)
    } else if (resumeText) {
      resume = resumeText
    } else {
      return res.status(400).json({ error: 'Please provide a resume' })
    }

    if (!jd) {
      return res.status(400).json({ error: 'Please provide a job description' })
    }

    if (!why) {
      return res.status(400).json({ error: 'Please provide your motivation' })
    }

    const { letter, model } = await generateCoverLetter({ jd, resume, why, highlight })

    await Letter.create({
      jd,
      resumeText: resume,
      why,
      highlight: highlight || '',
      generatedLetter: letter,
      model
    })

    res.json({ success: true, letter, model })
  } catch (error) {
    console.error('Generate error:', error)
    res.status(500).json({ error: error.message || 'Something went wrong generating your letter. Please try again.' })
  }
})

export default router