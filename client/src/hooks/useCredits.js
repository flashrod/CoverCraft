import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'

const CREDIT_KEY = 'covercraft_credits'
const SIGNED_IN_CREDIT_KEY = 'covercraft_signed_credits'
const SIGNED_IN_DATE_KEY = 'covercraft_signed_date'
const INITIAL_CREDITS = 2
const SIGNED_IN_DAILY_CREDITS = 10

export function useCredits() {
  const { user, isLoaded: isUserLoaded } = useUser()
  const [credits, setCredits] = useState(INITIAL_CREDITS)

  useEffect(() => {
    const isSignedIn = isUserLoaded && !!user
    
    if (isSignedIn) {
      const today = new Date().toDateString()
      const storedDate = localStorage.getItem(SIGNED_IN_DATE_KEY)
      
      if (storedDate !== today) {
        localStorage.setItem(SIGNED_IN_DATE_KEY, today)
        localStorage.setItem(SIGNED_IN_CREDIT_KEY, SIGNED_IN_DAILY_CREDITS)
        setCredits(SIGNED_IN_DAILY_CREDITS)
      } else {
        const stored = localStorage.getItem(SIGNED_IN_CREDIT_KEY)
        setCredits(stored ? parseInt(stored, 10) : SIGNED_IN_DAILY_CREDITS)
      }
    } else {
      const stored = localStorage.getItem(CREDIT_KEY)
      if (!stored) {
        localStorage.setItem(CREDIT_KEY, INITIAL_CREDITS)
        setCredits(INITIAL_CREDITS)
      } else {
        setCredits(parseInt(stored, 10))
      }
    }
  }, [user, isUserLoaded])

  const useCredit = () => {
    const isSignedIn = isUserLoaded && !!user
    const newCredits = Math.max(0, credits - 1)
    setCredits(newCredits)
    
    if (isSignedIn) {
      localStorage.setItem(SIGNED_IN_CREDIT_KEY, newCredits)
    } else {
      localStorage.setItem(CREDIT_KEY, newCredits)
    }
  }

  const isSignedIn = isUserLoaded && !!user
  const hasCredits = credits > 0
  const canGenerate = hasCredits

  return {
    credits,
    useCredit,
    hasCredits,
    isSignedIn,
    canGenerate
  }
}