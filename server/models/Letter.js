import mongoose from 'mongoose'

const LetterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  jd: { type: String, required: true },
  resumeText: { type: String, required: true },
  why: { type: String, required: true },
  highlight: { type: String, required: true },
  generatedLetter: { type: String, required: true },
  model: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Letter', LetterSchema)