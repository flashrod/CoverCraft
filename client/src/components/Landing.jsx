import { useEffect, useState } from 'react'
import { ArrowRight, Zap, CheckCircle2, CreditCard, FileText, MessageCircle, Sparkles, Copy, ArrowDown } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

function Landing({ onEnter }) {
  const [visible, setVisible] = useState(false)
  const [featuresVisible, setFeaturesVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setFeaturesVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      title: 'AI-Powered',
      description: 'Gemini 2.5 Flash with Llama fallback ensures your letter is always generated.',
      icon: Zap,
      badge: 'blue'
    },
    {
      title: 'Tailored Results',
      description: 'Every letter is crafted to match the specific job description and your unique experience.',
      icon: CheckCircle2,
      badge: 'green'
    },
    {
      title: 'Credit System',
      description: 'Two free generations for guests. Unlimited access when you sign in.',
      icon: CreditCard,
      badge: 'yellow'
    }
  ]

  const steps = [
    { step: '01', title: 'Paste job description', description: 'Copy the full job posting. We read everything.' },
    { step: '02', title: 'Add your resume', description: 'Upload a PDF or paste text directly.' },
    { step: '03', title: 'Answer two questions', description: 'Tell us why you want this role and what to highlight.' },
    { step: '04', title: 'Get your letter', description: 'AI generates a tailored cover letter in seconds.' }
  ]

  return (
    <div className="min-h-[100dvh] bg-[#FBFBFA]">
      {/* Fixed background with subtle gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #c9a66b 0%, transparent 70%)',
            top: '10%',
            left: '-20%',
            animation: 'drift 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #111111 0%, transparent 70%)',
            bottom: '20%',
            right: '-10%',
            animation: 'drift 25s ease-in-out infinite reverse'
          }}
        />
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
          <Button variant="ghost" size="sm" onClick={onEnter}>
            Open App
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Badge variant="secondary" className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mr-2" />
              Cover Letter Generator
            </Badge>
          </div>

          {/* Heading */}
          <h1 className={`mt-8 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#111111] transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Letters that sound
            <br />
            <span className="text-[#787774]">like you wrote them.</span>
          </h1>

          {/* Subheading */}
          <p className={`mt-6 text-lg text-[#787774] leading-relaxed max-w-xl mx-auto transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Paste a job description, add your resume, answer two questions.
            Get a tailored cover letter in seconds.
          </p>

          {/* CTA */}
          <div className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button size="lg" onClick={onEnter} className="px-6">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <span className="text-sm text-[#787774]">
              Free to try
            </span>
          </div>

          {/* Keyboard hint */}
          <div className={`mt-8 flex items-center justify-center gap-2 text-xs text-[#787774] transition-all duration-700 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <kbd className="px-2.5 py-1 bg-[#F7F6F3] border border-[#EAEAEA] rounded text-[10px] font-mono">No</kbd>
            <span>credit card required</span>
          </div>

          {/* Scroll indicator */}
          <div className={`mt-16 transition-all duration-700 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <ArrowDown className="w-5 h-5 text-[#787774] mx-auto animate-bounce" />
          </div>
        </div>
      </main>

      <Separator />

      {/* Features Bento Grid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={feature.title} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                      feature.badge === 'blue' ? 'bg-[#E1F3FE] text-[#1F6C9F]' :
                      feature.badge === 'green' ? 'bg-[#EDF3EC] text-[#346538]' :
                      'bg-[#FBF3DB] text-[#956400]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-[#111111] text-lg">{feature.title}</h3>
                    <p className="mt-2 text-sm text-[#787774] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl text-[#111111] tracking-tight text-center mb-12">
              How it works
            </h2>
            
            <div className="space-y-0">
              {steps.map((item, index) => (
                <div key={item.step} className="group">
                  <div className="flex items-start gap-6 py-6">
                    <span className="text-xs font-mono text-[#787774] pt-1 w-8">{item.step}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#111111] text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm text-[#787774]">{item.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-4 top-16 w-px h-full bg-[#EAEAEA] -z-10" />
                    )}
                  </div>
                  {index < steps.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] mb-6">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-serif text-3xl text-[#111111] tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-[#787774]">
              Two free cover letters. No account required.
            </p>
            <Button size="lg" onClick={onEnter} className="mt-8 px-8">
              Generate Your Letter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
          <Button variant="ghost" size="sm" onClick={onEnter}>
            Start generating
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default Landing