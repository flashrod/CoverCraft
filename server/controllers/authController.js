import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  })
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    const newUser = await User.create({ name, email, password })
    createSendToken(newUser, 201, res)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Something went wrong. Please try again.' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email or password' })
    }

    createSendToken(user, 200, res)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Something went wrong. Please try again.' })
  }
}

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  res.status(200).json({ status: 'success' })
}

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    status: 'success',
    data: { user }
  })
}