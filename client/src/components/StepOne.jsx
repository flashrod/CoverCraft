import { useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

function StepOne({ jd, setJd, onNext }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`w-full max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] mb-2">
          Paste the Job Description
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg">
          Copy the full job posting and paste it below
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here — include the role, requirements, and any details that matter..."
          className="min-h-[220px] text-base"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-[var(--muted-foreground)]">{jd.length} characters</span>
          <Button onClick={onNext} disabled={!jd.trim()} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepOne