import { useState, useEffect } from 'react'
import { Copy, Check, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

function LetterOutput({ letter, onStartOver, model }) {
  const [copied, setCopied] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modelLabel = model === 'gemini' 
    ? 'Gemini 2.5 Flash' 
    : 'Llama 3.3 on Groq'

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)]">
            Your Cover Letter
          </h2>
        </div>
        <Badge variant="secondary" className="text-xs font-medium">
          Generated with {modelLabel}
        </Badge>
      </div>

      <div className={`transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="shadow-lg bg-[var(--card)]">
          <CardContent className="p-10">
            <div 
              className="text-base leading-8 text-[var(--foreground)] whitespace-pre-wrap font-serif"
              style={{ maxWidth: '65ch' }}
            >
              {letter}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button variant="outline" onClick={handleCopy} size="lg">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button variant="ghost" onClick={onStartOver} size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      <Separator className="mt-10 mb-6" />
      
      <p className="text-center text-sm text-[var(--muted-foreground)] italic">
        Tip: Read it out loud before sending — make sure it sounds like you!
      </p>
    </div>
  )
}

export default LetterOutput