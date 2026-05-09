import { useState, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'

function StepTwo({ resume, setResume, resumeFile, setResumeFile, onNext, onBack }) {
  const fileInputRef = useRef(null)
  const [activeTab, setActiveTab] = useState('upload')

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Add Your Resume</h2>
        <p className="mt-2 text-gray-500">Upload a PDF or paste your resume text below</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">Upload PDF</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="border-dashed">
            <CardContent className="p-6">
              {resumeFile ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900">{resumeFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(resumeFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium">Click to upload PDF</p>
                  <p className="text-sm text-gray-400 mt-1">Max 5MB</p>
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
            placeholder="Paste your resume text here..."
            className="min-h-[300px]"
          />
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Next Step →
        </Button>
      </div>
    </div>
  )
}

export default StepTwo