import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }) {
  const { login, signup } = useAuth()
  const [tab, setTab] = useState(defaultMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTab(defaultMode)
    setError(null)
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }, [defaultMode, isOpen])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)
    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await signup(name, email, password, passwordConfirm)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="font-serif text-2xl text-[var(--foreground)]">Welcome</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="px-6 py-4">
          <TabsList className="w-full bg-[var(--secondary)] p-1 rounded-xl">
            <TabsTrigger value="login" className="flex-1 rounded-lg data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="flex-1 rounded-lg data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              {error && (
                <p className="text-[#DC2626] text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6 space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  required
                  minLength={8}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              {error && (
                <p className="text-[#DC2626] text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}