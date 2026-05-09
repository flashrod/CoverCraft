import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

function StepOne({ jd, setJd, onNext }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Paste the Job Description</h2>
        <p className="mt-2 text-gray-500">Copy the full job posting and paste it below</p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here..."
          className="min-h-[200px]"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{jd.length} characters</span>
          <Button onClick={onNext} disabled={!jd.trim()}>
            Next Step →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepOne