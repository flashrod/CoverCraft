import express from 'express'
import uploadMiddleware from '../middleware/upload.js'
import { parsePDF } from '../services/pdfParser.js'
import { generateCoverLetter, regenerateParagraph } from '../services/aiService.js'
import Letter from '../models/Letter.js'
import { optionalAuth } from '../middleware/protect.js'

const router = express.Router()

router.post('/generate', optionalAuth, uploadMiddleware.single('resume'), async (req, res) => {
  try {
    const { jd, why, highlight, resumeText, tone, letterLength } = req.body
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

    const { letter, model } = await generateCoverLetter({ 
      jd, 
      resume, 
      why, 
      highlight: highlight || '', 
      tone: tone || 'confident',
      letterLength: letterLength || 'medium'
    })

    await Letter.create({
      userId: req.user ? req.user._id : null,
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

router.post('/regenerate-paragraph', async (req, res) => {
  try {
    const { jd, resume, why, highlight, tone, letterLength, paragraph, instruction } = req.body

    if (!paragraph) {
      return res.status(400).json({ error: 'No paragraph provided' })
    }

    const newParagraph = await regenerateParagraph({
      jd,
      resume,
      why,
      highlight: highlight || '',
      tone: tone || 'confident',
      letterLength: letterLength || 'medium',
      paragraph,
      instruction
    })

    res.json({ success: true, paragraph: newParagraph })
  } catch (error) {
    console.error('Regenerate paragraph error:', error)
    res.status(500).json({ error: error.message || 'Something went wrong regenerating the paragraph.' })
  }
})

export default router