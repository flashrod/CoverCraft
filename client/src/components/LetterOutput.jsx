import { useState, useEffect, useMemo } from 'react'
import { Copy, Check, RefreshCw, Sparkles, Zap, FileDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005'

const STOP_WORDS = new Set([
  'the', 'that', 'with', 'this', 'from', 'have', 'will', 'been', 'were', 'they',
  'their', 'what', 'when', 'where', 'which', 'who', 'would', 'could', 'should',
  'there', 'these', 'those', 'into', 'than', 'then', 'them', 'some', 'other',
  'such', 'only', 'over', 'also', 'after', 'before', 'because', 'between',
  'through', 'during', 'above', 'below', 'while', 'about', 'more', 'most', 'any',
  'here', 'how', 'all', 'each', 'our', 'out', 'its', 'can', 'just', 'your'
])

function analyzeATS(jd, letter) {
  const jdWords = jd.toLowerCase().split(/\W+/).filter(w => w.length > 4)
  const jdFreq = {}
  jdWords.forEach(w => {
    if (!STOP_WORDS.has(w)) {
      jdFreq[w] = (jdFreq[w] || 0) + 1
    }
  })
  
  const topKeywords = Object.entries(jdFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word)
  
  const letterLower = letter.toLowerCase()
  const matched = topKeywords.filter(word => letterLower.includes(word))
  const missing = topKeywords.filter(word => !letterLower.includes(word))
  
  const score = Math.round((matched.length / topKeywords.length) * 100)
  
  return { matched, missing, score, total: topKeywords.length }
}

function runChecklist(letter) {
  const checks = []
  const wordCount = letter.split(/\s+/).filter(w => w).length
  
  checks.push({
    name: 'Under 400 words',
    passed: wordCount <= 400,
    tip: wordCount > 400 ? `Your letter is ${wordCount} words. Consider trimming.` : null
  })
  
  const bannedOpeners = ['i am writing', 'i am writing to express', 'i am interested in', 'i am applying for']
  const startsWithBanned = bannedOpeners.some(opener => letter.toLowerCase().trim().startsWith(opener))
  checks.push({
    name: 'Does not start with banned opener',
    passed: !startsWithBanned,
    tip: startsWithBanned ? 'Start with something more engaging like "When I discovered..."' : null
  })
  
  const bannedPhrases = ['passionate about', 'quick learner', 'work well in teams', 'synergy', 'leverage', 'results-driven', 'dynamic']
  const hasBannedPhrase = bannedPhrases.some(phrase => letter.toLowerCase().includes(phrase))
  checks.push({
    name: 'Contains no banned phrases',
    passed: !hasBannedPhrase,
    tip: hasBannedPhrase ? 'Remove generic phrases like "passionate about" or "results-driven".' : null
  })
  
  const ctaPhrases = ['look forward', 'discuss', 'hear from you', 'opportunity', 'conversation', 'next steps']
  const endsWithCTA = ctaPhrases.some(phrase => letter.toLowerCase().includes(phrase))
  checks.push({
    name: 'Ends with a call to action',
    passed: endsWithCTA,
    tip: endsWithCTA ? null : 'Add a call to action like "I look forward to discussing this opportunity."'
  })
  
  const hasNumber = /\d+/.test(letter)
  checks.push({
    name: 'Contains at least one number or metric',
    passed: hasNumber,
    tip: hasNumber ? null : 'Add numbers or metrics to make achievements more concrete.'
  })
  
  return checks
}

function LetterOutput({ letter, onStartOver, model, jd }) {
  const [copied, setCopied] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [regeneratingIndex, setRegeneratingIndex] = useState(null)
  const [paragraphs, setParagraphs] = useState([])
  
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const splits = letter.split('\n\n').filter(p => p.trim())
    setParagraphs(splits.length > 0 ? splits : [letter])
  }, [letter])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    const { jsPDF } = require('jspdf')
    const doc = new jsPDF()
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    
    const margin = 20
    const maxWidth = 170
    const lineHeight = 7
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Cover Letter', margin, 25)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    
    const splitText = doc.splitTextToSize(letter, maxWidth)
    let y = 40
    
    splitText.forEach(line => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.text(line, margin, y)
      y += lineHeight
    })
    
    doc.save('cover-letter.pdf')
  }

  const handleRegenerateParagraph = async (index, instruction) => {
    setRegeneratingIndex(index)
    try {
      const response = await axios.post(`${API_URL}/api/regenerate-paragraph`, {
        jd,
        resume: '',
        why: '',
        highlight: '',
        tone: 'confident',
        letterLength: 'medium',
        paragraph: paragraphs[index],
        instruction
      }, { withCredentials: true })
      
      const newParagraphs = [...paragraphs]
      newParagraphs[index] = response.data.paragraph
      setParagraphs(newParagraphs)
    } catch (error) {
      console.error('Failed to regenerate paragraph:', error)
    } finally {
      setRegeneratingIndex(null)
    }
  }

  const atsData = useMemo(() => jd ? analyzeATS(jd, letter) : null, [jd, letter])
  const checklist = useMemo(() => runChecklist(letter), [letter])

  const modelLabel = model === 'gemini' ? 'Gemini 2.5 Flash' : 'Llama 3.3 on Groq'

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#c9a66b]" />
          <h2 className="font-serif text-3xl font-semibold text-[#111111]">
            Your Cover Letter
          </h2>
        </div>
        <Badge variant="secondary" className="text-xs font-medium">
          Generated with {modelLabel}
        </Badge>
      </div>

      {/* Letter Content with Paragraph Actions */}
      <div className={`transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <div key={index} className="group relative">
                  <p className="text-base leading-8 text-[#111111] whitespace-pre-wrap font-serif">
                    {paragraph}
                  </p>
                  <div className="absolute -bottom-2 left-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleRegenerateParagraph(index, 'rewrite')}
                      disabled={regeneratingIndex === index}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Rewrite
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleRegenerateParagraph(index, 'concise')}
                      disabled={regeneratingIndex === index}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Concise
                    </Button>
                  </div>
                  {index < paragraphs.length - 1 && <div className="h-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" onClick={handleCopy} size="lg">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button variant="outline" onClick={handleDownloadPDF} size="lg">
          <FileDown className="w-4 h-4 mr-2" />
          PDF
        </Button>
        <Button variant="ghost" onClick={onStartOver} size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      {/* ATS Keyword Checker */}
      {atsData && (
        <>
          <Separator />
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">ATS Keyword Match</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#787774]">Match score</span>
                  <span className="font-medium">{atsData.score}%</span>
                </div>
                <Progress value={atsData.score} className="h-2" />
              </div>
              
              <p className="text-sm text-[#787774]">
                Your letter contains {atsData.matched.length}/{atsData.total} key terms from the job description.
              </p>
              
              {atsData.matched.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {atsData.matched.map(word => (
                    <Badge key={word} variant="success" className="text-xs">{word}</Badge>
                  ))}
                </div>
              )}
              
              {atsData.missing.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {atsData.missing.map(word => (
                    <Badge key={word} variant="outline" className="text-xs text-[#787774]">{word}</Badge>
                  ))}
                </div>
              )}
              
              {atsData.score < 60 && (
                <p className="text-xs text-[#787774] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Consider weaving in some missing keywords naturally.
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Before You Send Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Before You Send</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((check, index) => (
            <div key={index} className="flex items-start gap-3">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-[#346538] mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-[#9F2F2D] mt-0.5" />
              )}
              <div>
                <span className={`text-sm ${check.passed ? 'text-[#111111]' : 'text-[#111111]'}`}>
                  {check.name}
                </span>
                {check.tip && (
                  <p className="text-xs text-[#787774] mt-0.5">{check.tip}</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default LetterOutput