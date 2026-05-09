import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'

const CREDIT_KEY = 'covercraft_credits'
const INITIAL_CREDITS = 2

export function useCredits() {
  const { user, isLoaded: isUserLoaded } = useUser()
  const [credits, setCredits] = useState(INITIAL_CREDITS)

  useEffect(() => {
    const stored = localStorage.getItem(CREDIT_KEY)
    if (!stored) {
      localStorage.setItem(CREDIT_KEY, INITIAL_CREDITS)
      setCredits(INITIAL_CREDITS)
    } else {
      setCredits(parseInt(stored, 10))
    }
  }, [])

  const useCredit = () => {
    const newCredits = Math.max(0, credits - 1)
    setCredits(newCredits)
    localStorage.setItem(CREDIT_KEY, newCredits)
  }

  const isSignedIn = isUserLoaded && !!user
  const hasCredits = credits > 0
  const canGenerate = isSignedIn || hasCredits

  return {
    credits,
    useCredit,
    hasCredits,
    isSignedIn,
    canGenerate
  }
}