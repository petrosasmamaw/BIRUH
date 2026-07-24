import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '')
      .toLowerCase()
      .trim()
    const password = String(req.body.password || '')

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const result = await query('SELECT id, email, password_hash FROM admins WHERE email = $1', [
      email,
    ])
    const admin = result.rows[0]
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const ok = await bcrypt.compare(password, admin.password_hash)
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    )

    res.json({
      token,
      admin: { id: admin.id, email: admin.email },
    })
  } catch (err) {
    console.error('[auth/login]', err)
    res.status(500).json({ error: 'Login failed. Check database connection.' })
  }
})

router.get('/me', async (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Not authenticated' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ admin: { id: payload.sub, email: payload.email } })
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' })
  }
})

export default router
