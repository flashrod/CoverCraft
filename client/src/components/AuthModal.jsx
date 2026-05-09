import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }) {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState(defaultMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMode(defaultMode)
    setError(null)
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }, [defaultMode, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        await login(email, password)
        onClose()
      } else {
        if (password !== passwordConfirm) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        await signup(name, email, password, passwordConfirm)
        onClose()
      }
    } catch (err) {
      setError(err.response?.data?.message || (mode === 'login' ? 'Incorrect email or password' : 'Something went wrong. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError(null)
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Sign In' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {mode === 'login' ? 'Welcome back! Please enter your details.' : 'Create an account to start generating.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#EAEAEA] rounded-lg font-['Source_Sans_3'] font-normal focus-visible:ring-0 focus-visible:border-[#111111]"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#EAEAEA] rounded-lg font-['Source_Sans_3'] font-normal focus-visible:ring-0 focus-visible:border-[#111111]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={mode === 'signup' ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#EAEAEA] rounded-lg font-['Source_Sans_3'] font-normal focus-visible:ring-0 focus-visible:border-[#111111]"
            />
          </div>
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                required
                minLength={8}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="border-[#EAEAEA] rounded-lg font-['Source_Sans_3'] font-normal focus-visible:ring-0 focus-visible:border-[#111111]"
              />
            </div>
          )}

          {error && (
            <p className="text-[#DC2626] font-['Source_Sans_3'] font-normal text-[13px]">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="text-[13px] font-['Source_Sans_3'] text-muted-foreground hover:text-foreground"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
