import { Check } from 'lucide-react'
import { Progress } from './ui/progress'

const steps = ['Job Description', 'Your Resume', 'Final Details']

function ProgressBar({ currentStep }) {
  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="w-full py-8">
      <div className="max-w-2xl mx-auto">
        <Progress value={progressValue} className="h-1 mb-6" />
        <div className="flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNum = index + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep

            return (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[var(--primary)] text-white'
                        : isCurrent
                        ? 'bg-[var(--accent)] text-[var(--primary)] ring-2 ring-[var(--accent)]'
                        : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-sm hidden md:block font-medium transition-colors duration-300 ${
                      isCurrent 
                        ? 'text-[var(--foreground)]' 
                        : isCompleted 
                        ? 'text-[var(--foreground)]' 
                        : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar