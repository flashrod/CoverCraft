import { useState } from 'react'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import LetterOutput from './components/LetterOutput'
import { generateLetter } from './hooks/useGenerate'
import { useCredits } from './hooks/useCredits'

function App() {
  const [showApp, setShowApp] = useState(false)
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

  const { credits, useCredit, canGenerate, isSignedIn } = useCredits()

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
        highlight,
        canGenerate,
        useCredit,
        isSignedIn
      })
      setLetter(result.letter)
      setModel(result.model)
      setStep('result')
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Something went wrong generating your letter. Please try again.'
      setError(message)
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

  if (!showApp) {
    return <Landing onEnter={() => setShowApp(true)} />
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Navbar credits={credits} canGenerate={canGenerate} />

      {step !== 'result' && <ProgressBar currentStep={step} />}

      <main className="max-w-2xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-[#FDEBEC] border border-[#EAEAEA] rounded-lg text-[#9F2F2D] text-sm">
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
            canGenerate={canGenerate}
            credits={credits}
            isSignedIn={isSignedIn}
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