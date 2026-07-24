import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

const router = Router()

const SYSTEM_PROMPT = `You are the Hareg Tech support assistant. Hareg Tech is an Ethiopian software company based in Bahir Dar that builds websites, mobile apps, and AI-powered software for Ethiopian businesses.

WHAT WE BUILD:
- Custom Software & SaaS — web apps and platforms built for the client's business, not templates
- AI-Powered Solutions — LLM integration and automation
- LMS & EdTech Platforms — learning management systems for schools/universities with payments and exams
- Business Automation & ERP — inventory, HR, finance tools for Ethiopian enterprise
- Landing Pages & Websites — fast, high-converting sites
- Café Menu & Management — QR digital menus and order systems

OUR PRODUCTS (portfolio):
- Qandil AI (Beta) — LLM tutoring and adaptive study paths for Ethiopian students
- Hareg LMS (Live) — courses, exams, Chapa payments, QR attendance for schools
- Electric ERP (Delivered) — billing, inventory, HR for electric utilities
- Hospital Hub (Delivered) — admin/staff/patient portals for hospitals
- Room Reservation (Live) — venue booking with payments and admin tools
- Café Menu & Management (Live) — QR menus and order tracking
- Perfume Shop (Live) — e-commerce catalog, cart, inventory
- Food Delivery (Live) — ordering, tracking, vendor tools

TECH STACK: React, Next.js, Node.js/Express, MongoDB, PostgreSQL, Neon, Laravel, Supabase, Tailwind, Redux, Cloudinary, Better Auth, and Ethiopian payment integrations (Chapa, Telebirr, CBE Birr).

HOW WE WORK: Seed (discovery call) → Sprout (wireframes/UI, approved before coding) → Grow (agile sprints, weekly demos) → Bloom (deploy, train, 30-day support).

CONTACT:
- Phone: +251 89886956
- Email: asmamawpetros@gmail.com
- Telegram / Instagram / WhatsApp available — direct users to "Start a Project" or WhatsApp for anything requiring a human.
- Location: Bahir Dar, Ethiopia
- Website: https://haregtech.online

RULES:
1. Answer only using the information above. Keep answers short and conversational — 2-4 sentences unless the user asks for a list.
2. If the user asks something you cannot answer from the information above (custom pricing, project timelines specific to their case, technical implementation details, anything requiring a human decision) — say clearly that this is outside what you can answer, and give them the phone number (+251 89886956) or point them to WhatsApp/Telegram to reach the team directly. Do not guess or fabricate an answer.
3. If the user explicitly asks to talk to a human, an admin, or support — immediately give the phone number and WhatsApp option, don't try to keep answering yourself.
4. Never invent pricing, delivery timelines, or technical claims not listed above.
5. Stay friendly and on-brand — Hareg means "vine" in Amharic; you can lightly nod to the "grow with your business" framing but don't overdo it in every message.`

const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest'
const WINDOW_MS = 60_000
const MAX_REQUESTS = 20
const hits = new Map()

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim()
  }
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

function rateLimit(req, res, next) {
  const ip = clientIp(req)
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return next()
  }

  entry.count += 1
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many messages. Please wait a minute and try again.',
    })
  }
  return next()
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return []
  return history
    .slice(-12)
    .map((msg) => {
      const role = msg?.role === 'assistant' || msg?.role === 'model' ? 'model' : 'user'
      const text = String(msg?.content || msg?.text || '').trim()
      if (!text) return null
      return { role, parts: [{ text: text.slice(0, 2000) }] }
    })
    .filter(Boolean)
}

router.post('/', rateLimit, async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(503).json({
        error: 'Chat is temporarily unavailable. Please call +251 89886956 or use WhatsApp.',
      })
    }

    const message = String(req.body?.message || '').trim()
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    if (message.length > 1500) {
      return res.status(400).json({ error: 'Message is too long' })
    }

    const history = normalizeHistory(req.body?.history)
    const contents = [...history, { role: 'user', parts: [{ text: message }] }]

    const ai = new GoogleGenAI({ apiKey })
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        maxOutputTokens: 512,
      },
    })

    const reply = String(response?.text || '').trim()
    if (!reply) {
      return res.status(502).json({
        error:
          "Sorry, I'm having trouble right now — please reach us directly at +251 89886956 or via WhatsApp.",
      })
    }

    res.json({ reply })
  } catch (err) {
    console.error('[chat]', err?.message || err)
    res.status(502).json({
      error:
        "Sorry, I'm having trouble right now — please reach us directly at +251 89886956 or via WhatsApp.",
    })
  }
})

export default router
