import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

function StepThree({ why, setWhy, highlight, setHighlight, onSubmit, onBack, loading }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Two Quick Questions</h2>
        <p className="mt-2 text-gray-500">This is what makes your letter personal</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Why do you want this specific role or company?
          </label>
          <Textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="What genuinely excites you about this opportunity?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything specific you want to highlight? <span className="text-gray-400">(optional)</span>
          </label>
          <Textarea
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="A project, achievement, skill, or experience you want included..."
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={loading}>
            ← Back
          </Button>
          <Button onClick={onSubmit} disabled={!why.trim() || loading}>
            {loading ? (
              <>
                <Spinner className="w-4 h-4" />
                Generating...
              </>
            ) : (
              'Generate My Cover Letter ✨'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepThree