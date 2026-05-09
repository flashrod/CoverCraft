import { Lock } from 'lucide-react'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

function CreditWall() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You've used your free credits
          </h2>
          <p className="text-gray-500 mb-6">
            Sign in to generate unlimited cover letters for free
          </p>

          <div className="space-y-3">
            <SignInButton mode="modal">
              <Button className="w-full">
                Sign in with Google
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button variant="outline" className="w-full">
                Or create a free account
              </Button>
            </SignUpButton>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Free forever. No credit card needed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreditWall