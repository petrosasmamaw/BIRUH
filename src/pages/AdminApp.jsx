import { useEffect, useState } from 'react'
import { Loader2, Lock, Sprout } from 'lucide-react'
import { api, getAdminToken, setAdminToken } from '../api'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function boot() {
      const token = getAdminToken()
      if (!token) {
        if (!cancelled) {
          setAuthed(false)
          setChecking(false)
        }
        return
      }
      try {
        const data = await api.me()
        if (!cancelled) {
          setAdmin(data.admin)
          setAuthed(true)
        }
      } catch {
        if (!cancelled) {
          setAuthed(false)
          setAdmin(null)
        }
      } finally {
        if (!cancelled) setChecking(false)
      }
    }
    boot()
    return () => {
      cancelled = true
    }
  }, [])

  if (checking) {
    return (
      <div className="admin-shell admin-shell--center">
        <Loader2 className="animate-spin text-brand" size={28} />
        <p className="type-caption text-text-muted mt-3">Checking session…</p>
      </div>
    )
  }

  if (authed) {
    return (
      <AdminDashboard
        admin={admin}
        onLogout={() => {
          setAuthed(false)
          setAdmin(null)
        }}
      />
    )
  }

  return (
    <AdminLogin
      onSuccess={(user) => {
        setAdmin(user)
        setAuthed(true)
      }}
    />
  )
}

function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(email, password)
      setAdminToken(data.token)
      onSuccess(data.admin)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell admin-shell--center px-4">
      <div className="admin-card w-full max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <Sprout className="text-brand" size={22} />
          <p className="font-mono type-caption text-brand uppercase tracking-widest">Hareg Tech</p>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Admin login
        </h1>
        <p className="type-body-sm text-text-secondary mb-6">
          Sign in to view project orders. Active sessions skip this screen.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="project-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asmamawpetros@gmail.com"
            />
          </label>
          <label className="project-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="type-caption text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-touch w-full rounded-full bg-brand text-white font-semibold type-label hover:bg-brand-dark transition-colors disabled:opacity-60 gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Lock size={16} />
                Sign in
              </>
            )}
          </button>
        </form>

        <a
          href="/"
          className="block text-center mt-5 type-caption text-text-muted hover:text-brand transition-colors"
        >
          ← Back to website
        </a>
      </div>
    </div>
  )
}
