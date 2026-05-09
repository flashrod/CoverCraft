import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

function LetterOutput({ letter, onStartOver, model }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modelLabel = model === 'gemini' 
    ? 'Generated with Gemini 2.5 Flash' 
    : 'Generated with Llama 3.3 on Groq'

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cover Letter</h2>
        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
          {modelLabel}
        </span>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
            {letter}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button variant="outline" onClick={handleCopy}>
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button variant="outline" onClick={onStartOver}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Tip: Read it out loud before sending — make sure it sounds like you!
      </p>
    </div>
  )
}

export default LetterOutput