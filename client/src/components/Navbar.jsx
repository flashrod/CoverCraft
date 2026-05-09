import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

function Navbar({ credits, canGenerate }) {
  const { user, isLoaded } = useUser()

  const getBadgeVariant = () => {
    if (credits >= 2) return 'success'
    if (credits === 1) return 'warning'
    return 'destructive'
  }

  if (!isLoaded) return null

  return (
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
          {user ? (
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full"
                }
              }}
            />
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
              <SignInButton mode="modal">
                <button className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4">
                  Sign in
                </button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar