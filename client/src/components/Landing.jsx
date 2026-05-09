import { useEffect, useState } from 'react'
import { ArrowRight, Zap, CheckCircle2, CreditCard, ArrowDown } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

function Landing({ onEnter }) {
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleSeeHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { title: 'AI-Powered', description: 'Gemini 2.5 Flash with Llama fallback ensures your letter is always generated.', icon: Zap, badge: 'blue' },
    { title: 'Tailored Results', description: 'Every letter is crafted to match the specific job description and your unique experience.', icon: CheckCircle2, badge: 'green' },
    { title: 'Credit System', description: 'Two free credits for guests. 10 credits per day when you sign in.', icon: CreditCard, badge: 'yellow' }
  ]

  const steps = [
    { step: '01', title: 'Paste job description', description: 'Copy the full job posting. We read everything.' },
    { step: '02', title: 'Add your resume', description: 'Upload a PDF or paste text directly.' },
    { step: '03', title: 'Answer two questions', description: 'Tell us why you want this role and what to highlight.' },
    { step: '04', title: 'Get your letter', description: 'AI generates a tailored cover letter in seconds.' }
  ]

  const tones = ['Professional', 'Confident', 'Warm', 'Concise', 'Enthusiastic']
  const [tone, setTone] = useState('Confident')

  const previews = {
    Professional: "Dear Hiring Manager, I am writing to present my candidacy for this position. With five years of experience in product management, I bring a proven track record of delivering measurable results across cross-functional teams.",
    Confident: "Dear Hiring Manager, I've spent five years shipping products that users actually want — and this role is exactly where I want to do it next. Here's why I'm the right fit.",
    Warm: "Dear Hiring Manager, I came across this role and felt genuinely excited — it's rare to find a position that aligns so closely with both my background and what I care about.",
    Concise: "Dear Hiring Manager, Five years in product. Three 0-to-1 launches. Teams up to 12. I can do the same here — happy to walk you through how.",
    Enthusiastic: "Dear Hiring Manager, When I saw this role I immediately started drafting ideas. This is exactly the kind of work I've been building toward and I'd love to bring that energy to your team.",
  }

  const badgeMap = { Professional: 'yellow', Confident: 'blue', Warm: 'green', Concise: 'yellow', Enthusiastic: 'green' }

  return (
    <div className="min-h-[100dvh] bg-[#FBFBFA]">
      {/* Fixed background with subtle gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #c9a66b 0%, transparent 70%)', top: '10%', left: '-20%', animation: 'drift 20s ease-in-out infinite' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #111111 0%, transparent 70%)', bottom: '20%', right: '-10%', animation: 'drift 25s ease-in-out infinite reverse' }} />
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
      `}</style>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBFA]/80 backdrop-blur-md border-b border-[#EAEAEA]">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">C</span>
            </div>
            <span className="font-semibold text-[#111111] tracking-tight">CoverCraft</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onEnter}>Open App</Button>
        </nav>
      </header>

      {/* Hero */}
      <main className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className={`inline-block mb-6 border border-[#EAEAEA] bg-white text-[#787774] text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            AI-Powered · Free to Start
          </span>

          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#111111] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Letters that sound<br />
            <span className="text-[#787774]">like you wrote them.</span>
          </h1>

          <p className={`mt-6 text-lg text-[#787774] leading-relaxed max-w-xl mx-auto transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            Paste a job description, add your resume, answer two questions.
            Get a tailored cover letter in seconds.
          </p>

          <div className={`mt-10 flex items-center justify-center gap-4 transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            <Button size="lg" onClick={onEnter} className="px-6">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={handleSeeHowItWorks}>
              See How It Works
            </Button>
          </div>

          <p className={`mt-6 text-xs text-[#787774] transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            2 free generations · No account needed
          </p>

          <div className={`mt-16 transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            <ArrowDown className="w-5 h-5 text-[#787774] mx-auto animate-bounce" />
          </div>

          <div className={`mt-8 flex items-center justify-center gap-2 flex-wrap transition-opacity duration-500 ${heroIn ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-xs text-[#787774]">Used by students at</span>
            {['IIT Bombay', 'UCLA', 'LSE', 'NUS'].map(p => (
              <span key={p} className="border border-[#EAEAEA] bg-white rounded-full px-3 py-1 text-xs text-[#787774]">{p}</span>
            ))}
          </div>
        </div>
      </main>

      <Separator />

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.15em] text-[#787774] uppercase font-normal mb-3">FEATURES</p>
          <h2 className="font-serif text-3xl text-[#111111] tracking-tight">Everything you need.</h2>
          <p className="text-[#787774] text-base mt-2">Simple tools. Powerful output.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {features.map(f => (
              <Card key={f.title} className="hover:border-[#111111] transition-colors duration-150 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                    f.badge === 'blue' ? 'bg-[#E1F3FE] text-[#1F6C9F]' :
                    f.badge === 'green' ? 'bg-[#EDF3EC] text-[#346538]' :
                    'bg-[#FBF3DB] text-[#956400]'
                  }`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-[#111111] text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-[#787774] leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.15em] text-[#787774] uppercase font-normal mb-3">PROCESS</p>
          <h2 className="font-serif text-3xl text-[#111111] tracking-tight mb-12">How it works</h2>

          <div className="space-y-0">
            {steps.map((item, index) => (
              <div key={item.step} className="group">
                <div className="flex items-start gap-6 py-6">
                  <span className="font-serif text-4xl text-[#EAEAEA] leading-none w-12 shrink-0 select-none group-hover:text-[#c8c6c2] transition-colors duration-150">{item.step}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#111111] text-lg">{item.title}</h3>
                    <p className="mt-1 text-sm text-[#787774]">{item.description}</p>
                  </div>
                  {index < steps.length - 1 && <div className="absolute left-4 top-16 w-px h-full bg-[#EAEAEA] -z-10" />}
                </div>
                {index < steps.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Tone Preview */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.15em] text-[#787774] uppercase font-normal mb-3">TONE SELECTOR</p>
          <h2 className="font-serif text-3xl text-[#111111] tracking-tight">Write in your voice.</h2>
          <p className="text-[#787774] text-base mt-2">Choose how you want to sound. The letter adapts completely.</p>

          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {tones.map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full px-4 py-1.5 text-sm cursor-pointer transition-all duration-150 ${
                  tone === t ? 'border border-[#111111] bg-[#111111] text-white' : 'border border-[#EAEAEA] bg-white text-[#787774] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Card className="mt-6 text-left">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs tracking-[0.12em] uppercase text-[#787774]">PREVIEW</span>
                <Badge variant={badgeMap[tone]}>{tone}</Badge>
              </div>
              <p className="italic text-[#111111] text-base leading-relaxed">{previews[tone]}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.15em] text-[#787774] uppercase font-normal mb-3">GET STARTED</p>
          <h2 className="font-serif text-4xl text-[#111111] tracking-tight">Ready to land<br />the interview?</h2>
          <p className="text-[#787774] mt-4">Free to start. No account needed. Takes 2 minutes.</p>

          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" onClick={onEnter} className="px-6">Generate My Letter →</Button>
            <Button variant="outline" size="lg" onClick={handleSeeHowItWorks}>See How It Works</Button>
          </div>

          <div className="mt-6 flex justify-center gap-8">
            <div><span className="font-serif text-2xl text-[#111111]">2</span><span className="block text-xs text-[#787774] mt-1">free generations</span></div>
            <div><span className="font-serif text-2xl text-[#111111]">30s</span><span className="block text-xs text-[#787774] mt-1">avg generation time</span></div>
            <div><span className="font-serif text-2xl text-[#111111]">5</span><span className="block text-xs text-[#787774] mt-1">tone options</span></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#EAEAEA]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#111111] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">C</span>
            </div>
            <span className="text-sm text-[#787774]">CoverCraft</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-xs text-[#787774] hover:text-[#111111] transition-colors duration-150 cursor-pointer" onClick={onEnter}>Privacy</button>
            <button className="text-xs text-[#787774] hover:text-[#111111] transition-colors duration-150 cursor-pointer" onClick={onEnter}>Terms</button>
            <button className="text-xs text-[#787774] hover:text-[#111111] transition-colors duration-150 cursor-pointer" onClick={onEnter}>Twitter</button>
          </div>

          <button onClick={onEnter} className="text-xs text-[#787774] hover:text-[#111111] transition-colors duration-150 cursor-pointer">
            Start generating →
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Landing