import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function clean(value) {
  if (value == null) return null
  const s = String(value).trim()
  return s.length ? s : null
}

router.post('/', async (req, res) => {
  try {
    const businessName = clean(req.body.businessName)
    const phone = clean(req.body.phone)
    const contactName = clean(req.body.contactName)
    const address = clean(req.body.address)
    const businessType = clean(req.body.businessType)
    const notes = clean(req.body.notes)

    let websiteTypes = req.body.websiteTypes
    if (Array.isArray(websiteTypes)) {
      websiteTypes = websiteTypes.map((t) => String(t).trim()).filter(Boolean).join(', ')
    } else {
      websiteTypes = clean(websiteTypes)
    }

    if (!businessName || !phone) {
      return res.status(400).json({
        error: 'Business name and phone number are required',
      })
    }

    if (phone.length < 8) {
      return res.status(400).json({ error: 'Please enter a valid phone number' })
    }

    const result = await query(
      `
      INSERT INTO orders
        (business_name, phone, contact_name, address, business_type, website_types, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, business_name, phone, created_at, status
      `,
      [businessName, phone, contactName, address, businessType, websiteTypes, notes],
    )

    res.status(201).json({
      message: 'Order received. We will reach out soon.',
      order: result.rows[0],
    })
  } catch (err) {
    console.error('[orders/create]', err)
    res.status(500).json({ error: 'Could not save order. Check database connection.' })
  }
})

router.get('/', requireAuth, async (req, res) => {
  try {
    const result = await query(
      `
      SELECT
        id,
        business_name AS "businessName",
        phone,
        contact_name AS "contactName",
        address,
        business_type AS "businessType",
        website_types AS "websiteTypes",
        notes,
        status,
        created_at AS "createdAt"
      FROM orders
      ORDER BY created_at DESC
      `,
    )
    res.json({ orders: result.rows })
  } catch (err) {
    console.error('[orders/list]', err)
    res.status(500).json({ error: 'Could not load orders' })
  }
})

router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const status = clean(req.body.status)
    const allowed = ['new', 'contacted', 'in_progress', 'done', 'archived']
    if (!id || !allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const result = await query(
      `
      UPDATE orders SET status = $1
      WHERE id = $2
      RETURNING id, status
      `,
      [status, id],
    )

    if (!result.rows[0]) return res.status(404).json({ error: 'Order not found' })
    res.json({ order: result.rows[0] })
  } catch (err) {
    console.error('[orders/status]', err)
    res.status(500).json({ error: 'Could not update status' })
  }
})

export default router
