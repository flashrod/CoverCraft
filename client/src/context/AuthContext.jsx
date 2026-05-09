import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        { withCredentials: true }
      )
      setUser(res.data.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function signup(name, email, password, passwordConfirm) {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
      { name, email, password, passwordConfirm },
      { withCredentials: true }
    )
    setUser(res.data.data.user)
    return res.data
  }

  async function login(email, password) {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    )
    setUser(res.data.data.user)
    return res.data
  }

  async function logout() {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    )
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, isSignedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
