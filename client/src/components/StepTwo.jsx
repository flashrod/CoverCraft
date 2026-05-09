import { useState, useRef, useEffect } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'

function StepTwo({ resume, setResume, resumeFile, setResumeFile, onNext, onBack }) {
  const fileInputRef = useRef(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      setActiveTab('upload')
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const canProceed = resumeFile || (activeTab === 'text' && resume.trim())

  return (
    <div className={`w-full max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] mb-2">
          Add Your Resume
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg">
          Upload a PDF or paste your resume text below
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="upload" className="flex-1">Upload PDF</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300">
            <CardContent className="p-8">
              {resumeFile ? (
                <div className="flex items-center justify-between p-4 bg-[var(--secondary)] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{resumeFile.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{formatFileSize(resumeFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="p-2 hover:bg-[var(--border)] rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--muted-foreground)]" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-[var(--secondary)] rounded-xl transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-[var(--muted-foreground)]" />
                  </div>
                  <p className="text-[var(--foreground)] font-medium">Click to upload PDF</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">Max 5MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here — work experience, education, skills..."
            className="min-h-[280px] text-base"
          />
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between mt-8 pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continue
        </Button>
      </div>
    </div>
  )
}

export default StepTwo