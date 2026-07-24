import { useCallback, useEffect, useState } from 'react'
import { LogOut, RefreshCw, Loader2, Phone, Building2, MapPin, Tag } from 'lucide-react'
import { api, clearAdminToken } from '../api'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: 'archived', label: 'Archived' },
]

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export default function AdminDashboard({ admin, onLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const load = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const data = await api.listOrders()
      setOrders(data.orders || [])
    } catch (err) {
      if (err.status === 401) {
        clearAdminToken()
        onLogout()
        return
      }
      setError(err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [onLogout])

  useEffect(() => {
    load()
  }, [load])

  const onStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await api.updateOrderStatus(id, status)
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    } catch (err) {
      if (err.status === 401) {
        clearAdminToken()
        onLogout()
        return
      }
      setError(err.message || 'Could not update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const logout = () => {
    clearAdminToken()
    onLogout()
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar__inner">
          <div>
            <p className="font-mono type-caption text-brand uppercase tracking-widest">Dashboard</p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
              Project orders
            </h1>
            <p className="type-caption text-text-muted mt-0.5">{admin?.email}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              type="button"
              onClick={load}
              className="btn-touch !min-h-10 px-3 rounded-full border border-gold/35 type-caption text-text-secondary hover:text-brand hover:border-gold/55 transition-colors gap-1.5"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <a
              href="/"
              className="btn-touch !min-h-10 px-3 rounded-full border border-gold/35 type-caption text-text-secondary hover:text-brand transition-colors"
            >
              Website
            </a>
            <button
              type="button"
              onClick={logout}
              className="btn-touch !min-h-10 px-3 rounded-full bg-brand text-white type-caption font-semibold hover:bg-brand-dark transition-colors gap-1.5"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {error && (
          <p className="type-caption text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <Loader2 className="animate-spin text-brand mb-3" size={28} />
            <p className="type-caption">Loading orders…</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="admin-card text-center py-14">
            <p className="font-display text-xl font-bold text-text-primary mb-2">No orders yet</p>
            <p className="type-body-sm text-text-secondary">
              When customers confirm a project request, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            <p className="type-caption text-text-muted mb-1">
              {orders.length} order{orders.length === 1 ? '' : 's'}
            </p>
            {orders.map((order) => (
              <article key={order.id} className="admin-order">
                <div className="admin-order__head">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-text-primary text-base sm:text-lg truncate flex items-center gap-2">
                      <Building2 size={16} className="text-brand shrink-0" />
                      {order.businessName}
                    </h2>
                    <p className="type-caption text-text-muted mt-1">
                      #{order.id} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <label className="admin-status">
                    <span className="sr-only">Status</span>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="admin-order__grid">
                  <p className="flex items-start gap-2 type-body-sm text-text-secondary">
                    <Phone size={15} className="text-brand mt-0.5 shrink-0" />
                    <a href={`tel:${order.phone}`} className="hover:text-brand break-all">
                      {order.phone}
                    </a>
                  </p>
                  {order.contactName && (
                    <p className="type-body-sm text-text-secondary">Contact: {order.contactName}</p>
                  )}
                  {order.businessType && (
                    <p className="flex items-start gap-2 type-body-sm text-text-secondary">
                      <Tag size={15} className="text-brand mt-0.5 shrink-0" />
                      {order.businessType}
                    </p>
                  )}
                  {order.address && (
                    <p className="flex items-start gap-2 type-body-sm text-text-secondary sm:col-span-2">
                      <MapPin size={15} className="text-brand mt-0.5 shrink-0" />
                      {order.address}
                    </p>
                  )}
                  {order.websiteTypes && (
                    <p className="type-body-sm text-text-secondary sm:col-span-2">
                      <span className="text-text-muted">Wants: </span>
                      {order.websiteTypes}
                    </p>
                  )}
                  {order.notes && (
                    <p className="type-body-sm text-text-secondary sm:col-span-2 border-t border-border/50 pt-2 mt-1">
                      {order.notes}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
