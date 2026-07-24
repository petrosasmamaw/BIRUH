import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { pool } from './db.js'

dotenv.config()

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        business_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        contact_name TEXT,
        address TEXT,
        business_type TEXT,
        website_types TEXT,
        notes TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    const email = (process.env.ADMIN_EMAIL || 'asmamawpetros@gmail.com').toLowerCase().trim()
    const password = process.env.ADMIN_PASSWORD || '12345678'
    const hash = await bcrypt.hash(password, 12)

    await client.query(
      `
      INSERT INTO admins (email, password_hash)
      VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
      `,
      [email, hash],
    )

    await client.query('COMMIT')
    console.log('[migrate] Tables ready. Admin seeded:', email)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('[migrate] Failed:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
