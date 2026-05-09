import { useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import CreditWall from './CreditWall'
import { Label } from './ui/label'

function StepThree({ why, setWhy, highlight, setHighlight, onSubmit, onBack, loading, canGenerate, credits, isSignedIn }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!canGenerate) {
    return <CreditWall />
  }

  return (
    <div className={`w-full max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] mb-2">
          Two Quick Questions
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg">
          This is what makes your letter personal
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-[var(--foreground)] text-base font-medium">
            Why do you want this specific role or company?
          </Label>
          <Textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="What genuinely excites you about this opportunity? What drew you to this company?"
            className="min-h-[140px] text-base"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[var(--foreground)] text-base font-medium">
            Anything specific you want to highlight? <span className="text-[var(--muted-foreground)]">(optional)</span>
          </Label>
          <Textarea
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="A project, achievement, skill, or experience you want included in your letter..."
            className="min-h-[140px] text-base"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={onBack} disabled={loading}>
            Back
          </Button>
          <Button onClick={onSubmit} disabled={!why.trim() || loading} size="lg">
            {loading ? (
              <span className="animate-pulse-soft flex items-center gap-2">
                <Spinner className="w-4 h-4" />
                Crafting your letter...
              </span>
            ) : (
              'Generate My Cover Letter'
            )}
          </Button>
        </div>

        {!isSignedIn && (
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            You have {credits} free generation{credits !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>
    </div>
  )
}

export default StepThree