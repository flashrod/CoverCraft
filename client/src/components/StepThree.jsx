import { useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import CreditWall from './CreditWall'
import { Label } from './ui/label'
import { Card, CardContent } from './ui/card'

const tones = [
  { value: 'professional', label: 'Professional', description: 'Formal and polished' },
  { value: 'confident', label: 'Confident', description: 'Direct and assertive' },
  { value: 'warm', label: 'Warm', description: 'Human and personable' },
  { value: 'concise', label: 'Concise', description: 'Short and punchy' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and excited' },
]

const lengths = [
  { value: 'short', label: 'Short', description: '~150 words' },
  { value: 'medium', label: 'Medium', description: '~250 words' },
  { value: 'full', label: 'Full', description: '~400 words' },
]

function StepThree({ why, setWhy, highlight, setHighlight, onSubmit, onBack, loading, canGenerate, credits, isSignedIn, tone, setTone, letterLength, setLetterLength }) {
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

        {/* Tone Selector */}
        <div className="space-y-3">
          <Label className="text-[var(--foreground)] text-base font-medium">
            How should you sound?
          </Label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <Button
                key={t.value}
                variant={tone === t.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTone(t.value)}
                className="text-sm"
              >
                {t.label}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {tones.find(t => t.value === tone)?.description}
          </p>
        </div>

        {/* Letter Length Selector */}
        <div className="space-y-3">
          <Label className="text-[var(--foreground)] text-base font-medium">
            Letter length
          </Label>
          <div className="flex flex-wrap gap-2">
            {lengths.map((l) => (
              <Button
                key={l.value}
                variant={letterLength === l.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLetterLength(l.value)}
                className="text-sm"
              >
                {l.label}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {lengths.find(l => l.value === letterLength)?.description}
          </p>
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