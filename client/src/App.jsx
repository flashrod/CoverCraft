import { useState } from 'react'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import LetterOutput from './components/LetterOutput'
import { generateLetter } from './hooks/useGenerate'

function App() {
  const [step, setStep] = useState(1)
  const [jd, setJd] = useState('')
  const [resume, setResume] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [why, setWhy] = useState('')
  const [highlight, setHighlight] = useState('')
  const [letter, setLetter] = useState('')
  const [model, setModel] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateLetter({
        jd,
        resume,
        resumeFile,
        why,
        highlight
      })
      setLetter(result.letter)
      setModel(result.model)
      setStep('result')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong generating your letter. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStartOver = () => {
    setStep(1)
    setJd('')
    setResume('')
    setResumeFile(null)
    setWhy('')
    setHighlight('')
    setLetter('')
    setModel('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {step !== 'result' && <ProgressBar currentStep={step} />}

      <main className="max-w-3xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {step === 1 && <StepOne jd={jd} setJd={setJd} onNext={handleNext} />}
        {step === 2 && (
          <StepTwo
            resume={resume}
            setResume={setResume}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <StepThree
            why={why}
            setWhy={setWhy}
            highlight={highlight}
            setHighlight={setHighlight}
            onSubmit={handleSubmit}
            onBack={handleBack}
            loading={loading}
          />
        )}
        {step === 'result' && (
          <LetterOutput
            letter={letter}
            onStartOver={handleStartOver}
            model={model}
          />
        )}
      </main>
    </div>
  )
}

export default App