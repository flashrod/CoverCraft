import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    let token

    if (req.cookies.jwt) {
      token = req.cookies.jwt
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id)

    if (!currentUser) {
      return res.status(401).json({ message: 'User no longer exists' })
    }

    req.user = currentUser
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Your session has expired. Please log in again' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const optionalAuth = async (req, res, next) => {
  try {
    let token

    if (req.cookies.jwt) {
      token = req.cookies.jwt
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id)

    if (currentUser) {
      req.user = currentUser
    }
    next()
  } catch (error) {
    // If token is invalid or expired, just proceed as guest
    next()
  }
}
