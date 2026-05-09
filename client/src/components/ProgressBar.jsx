import { Check } from 'lucide-react'

const steps = ['Job Description', 'Your Resume', 'Final Details']

function ProgressBar({ currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < currentStep
          const isCurrent = stepNum === currentStep

          return (
            <div key={label} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isCompleted
                      ? 'bg-indigo-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 transition-all duration-200 ${
                    isCompleted ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar