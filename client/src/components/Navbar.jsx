import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'

function Navbar({ credits, canGenerate }) {
  const { user, isLoaded } = useUser()

  const getCreditColor = () => {
    if (credits >= 2) return 'text-green-600 bg-green-50'
    if (credits === 1) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  if (!isLoaded) return null

  return (
    <nav className="w-full py-4 px-6 border-b border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">CoverCraft</h1>
          <span className="text-sm text-gray-500 hidden sm:inline">Land the interview.</span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCreditColor()}`}>
                ✦ {credits} credit{credits !== 1 ? 's' : ''} remaining
              </span>
              <SignInButton mode="modal">
                <button className="text-sm text-gray-400 hover:text-gray-600 underline">
                  Sign in for unlimited
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