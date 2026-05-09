import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

function CreditWall() {
  const [isVisible, setIsVisible] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('signup')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <div className={`w-full max-w-lg mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Dialog open={!authModalOpen} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md text-center" hideCloseButton>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-5">
                <Lock className="w-7 h-7 text-[var(--accent)]" />
              </div>

              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-[var(--foreground)]">
                  You've used your free credits
                </DialogTitle>
                <DialogDescription className="text-[var(--muted-foreground)] mt-2">
                  Sign in to generate unlimited cover letters — free forever
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex flex-col gap-3 w-full mt-6">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setAuthModalMode('signup')
                    setAuthModalOpen(true)
                  }}
                >
                  Create Free Account
                </Button>

                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setAuthModalMode('login')
                    setAuthModalOpen(true)
                  }}
                >
                  Sign In
                </Button>
              </DialogFooter>

              <p className="text-xs text-[var(--muted-foreground)] mt-6">
                Free forever. No credit card needed.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </>
  )
}

export default CreditWall