import { useState } from 'react'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

function Navbar({ credits, canGenerate }) {
  const { user, isSignedIn, logout, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  const getBadgeVariant = () => {
    if (credits >= 2) return 'success'
    if (credits === 1) return 'warning'
    return 'destructive'
  }

  if (loading) return null

  return (
    <>
      <nav className="w-full py-5 px-6 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl font-semibold text-[var(--foreground)] tracking-tight">
              CoverCraft
            </h1>
            <span className="text-sm text-[var(--muted-foreground)] hidden sm:inline font-light">
              Land the interview.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="font-['Source_Sans_3'] font-normal text-[13px] text-[#787774]">
                  Hi, {user?.name?.split(' ')[0] || 'User'}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant={getBadgeVariant()} className="px-3 py-1.5 text-sm font-medium">
                      ✦ {credits} left
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sign in for unlimited generations</p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setAuthModalMode('login')
                      setAuthModalOpen(true)
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAuthModalMode('signup')
                      setAuthModalOpen(true)
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </>
  )
}

export default Navbar