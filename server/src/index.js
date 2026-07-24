import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (no Origin) and trusted frontends
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error(`Origin not allowed by CORS: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'Hareg Tech API',
    time: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.use((err, _req, res, _next) => {
  if (err?.message?.startsWith('Origin not allowed')) {
    return res.status(403).json({ error: err.message })
  }
  console.error('[server]', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`[hareg-api] listening on http://localhost:${PORT}`)
  console.log(`[hareg-api] trusted origins: ${allowedOrigins.join(', ')}`)
})
