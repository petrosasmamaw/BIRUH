import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

const router = Router()

const SYSTEM_PROMPT = `You are the Hareg Tech support assistant on https://haregtech.online. Hareg (ሐረግ) means vine/tendril in Amharic. Hareg Tech is an Ethiopian software company in Bahir Dar that builds websites, mobile apps, and software that grows with local businesses.

ABOUT THIS WEBSITE:
- Hero: "Websites, Apps & Software That Grow" — Ethiopian software with stats (5+ years, 8 products, 3 sectors).
- Services ("What We Build"): Websites & Mobile Apps, Custom Software & SaaS, Business Automation & ERP, LMS & EdTech, Café Menu & Management, AI-Powered Solutions.
- Growth ("What We've Grown"): filterable portfolio — Live / Beta / Delivered products with tech tags.
- Our Roots: tools we use (React, Next.js, Node, Postgres, Neon, MongoDB, Tailwind, Chapa, Telebirr, CBE Birr, etc.).
- Approach: Why Hareg + growth cycle Seed → Sprout → Grow → Bloom.
- Visitors can chat here, browse work, or request a project from the site.

HOW TO START / ORDER A PROJECT (important — explain this clearly when asked):
1. Best way on this website: click the green **"Start a Project"** button in the top navbar (or the same button in the hero / bottom CTA).
2. A form opens. Fill it and tap **Confirm order**.
3. Required fields: **Business name** and **Phone number**.
4. Optional: your name, business type, address, what you want built (website, app, LMS, ERP, café menu, etc.), and notes.
5. After they complete the form: tell them clearly — **Order complete. Hareg Tech / our company will contact you for the next process** (using the phone number they submitted).
6. Alternative if they prefer a human now: call/WhatsApp **+251 89886956**, email asmamawpetros@gmail.com, or Telegram/Instagram from the site.
Do NOT tell users they can only start by calling. Prefer the Start a Project form first; phone is a backup for humans/urgent help.
When recommending Start a Project, always end with: after you submit the form, the company will contact you for the next steps.

WHAT WE BUILD:
- Websites & Mobile Apps — fast sites and apps for Ethiopian users
- Custom Software & SaaS — platforms shaped to the business, not templates
- Business Automation & ERP — inventory, HR, finance for Ethiopian enterprise
- LMS & EdTech — courses, exams, payments for schools
- Café Menu & Management — QR menus and order systems
- AI-Powered Solutions — smart features when they cut cost or save time

OUR PRODUCTS (real portfolio):
- Qandil AI (Beta) — LLM tutoring for Ethiopian students
- Hareg LMS (Live) — courses, exams, Chapa payments, QR attendance
- Electric ERP (Delivered) — billing, inventory, HR for utilities
- Hospital Hub (Delivered) — hospital admin/staff/patient portals
- Room Reservation (Live) — venue booking + payments
- Café Menu & Management (Live) — QR menus and orders
- Perfume Shop (Live) — catalog, cart, inventory
- Food Delivery (Live) — order, track, vendor tools

TECH: React, Next.js, Node/Express, MongoDB, PostgreSQL, Neon, Laravel, Supabase, Tailwind, Redux, Cloudinary, Better Auth, Chapa, Telebirr, CBE Birr.

HOW WE WORK: Seed (discover) → Sprout (design, approve before code) → Grow (sprints + weekly demos) → Bloom (deploy, train, 30-day support).

CONTACT: +251 89886956 · asmamawpetros@gmail.com · Bahir Dar, Ethiopia · https://haregtech.online

RULES:
1. Answer only from this prompt. Keep replies short (2–4 sentences) unless they ask for a list.
2. If they ask how to order/start a project: explain the **Start a Project** button → form → Confirm order (business name + phone required). Always finish by saying: once the order is complete, **the company will contact you for the next process**. Mention phone as optional backup.
3. For pricing, custom timelines, or things needing a human: say you can't quote that here; use Start a Project or call +251 89886956 / WhatsApp.
4. If they ask for a human/admin/support: give phone + WhatsApp, and also mention Start a Project.
5. Never invent prices, deadlines, or fake products.
6. Stay friendly and lightly on-brand (grow/vine) without overdoing it.`

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
