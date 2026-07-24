import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Shield, CheckCircle2, Loader2 } from 'lucide-react'
import { api, openAdminFromModal } from '../api'

const BUSINESS_TYPES = [
  'Café / Restaurant',
  'School / Education',
  'Shop / Retail',
  'Clinic / Healthcare',
  'Startup',
  'Enterprise / NGO',
  'Other',
]

const WEBSITE_OPTIONS = [
  'Business website',
  'Landing page',
  'E-commerce / shop',
  'Mobile app',
  'LMS / school platform',
  'ERP / management system',
  'Café menu / QR system',
  'Custom software',
]

const emptyForm = {
  businessName: '',
  phone: '',
  contactName: '',
  address: '',
  businessType: '',
  websiteTypes: [],
  notes: '',
}

export default function ProjectOrderModal() {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const openHandler = () => {
      setOpen(true)
      setError('')
      setSuccess(false)
    }
    const closeHandler = () => setOpen(false)
    window.addEventListener('hareg:open-project-modal', openHandler)
    window.addEventListener('hareg:close-project-modal', closeHandler)
    return () => {
      window.removeEventListener('hareg:open-project-modal', openHandler)
      window.removeEventListener('hareg:close-project-modal', closeHandler)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const toggleWebsiteType = (type) => {
    setForm((prev) => {
      const has = prev.websiteTypes.includes(type)
      return {
        ...prev,
        websiteTypes: has
          ? prev.websiteTypes.filter((t) => t !== type)
          : [...prev.websiteTypes, type],
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.businessName.trim() || !form.phone.trim()) {
      setError('Business name and phone number are required.')
      return
    }

    setSubmitting(true)
    try {
      await api.createOrder({
        businessName: form.businessName.trim(),
        phone: form.phone.trim(),
        contactName: form.contactName.trim() || undefined,
        address: form.address.trim() || undefined,
        businessType: form.businessType || undefined,
        websiteTypes: form.websiteTypes,
        notes: form.notes.trim() || undefined,
      })
      setSuccess(true)
      setForm(emptyForm)
    } catch (err) {
      setError(err.message || 'Could not submit order. Is the API running on port 5000?')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="project-modal" role="presentation">
      <button
        type="button"
        className="project-modal__backdrop"
        aria-label="Close dialog"
        onClick={() => setOpen(false)}
      />
      <div
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="project-modal__top">
          <button
            type="button"
            className="project-modal__admin"
            onClick={openAdminFromModal}
          >
            <Shield size={14} aria-hidden="true" />
            Admin
          </button>
          <button
            type="button"
            className="project-modal__close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="project-modal__success">
            <CheckCircle2 className="text-brand mx-auto mb-3" size={40} />
            <h2 id={titleId} className="font-display text-2xl font-bold text-text-primary mb-2">
              Order confirmed
            </h2>
            <p className="type-body-sm text-text-secondary mb-6">
              Thanks — your project request is planted. We&apos;ll reach out on WhatsApp or phone soon.
            </p>
            <button
              type="button"
              className="btn-touch w-full rounded-full bg-brand text-white font-semibold type-label hover:bg-brand-dark transition-colors"
              onClick={() => {
                setSuccess(false)
                setOpen(false)
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 pr-8">
              <p className="font-mono type-caption text-brand uppercase tracking-widest mb-2">
                Start a project
              </p>
              <h2 id={titleId} className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                Tell us what to grow
              </h2>
              <p className="type-body-sm text-text-secondary">
                Business name &amp; phone are required. Everything else is optional.
              </p>
            </div>

            <form onSubmit={onSubmit} className="project-modal__form space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="project-field sm:col-span-2">
                  <span>
                    Business name <em>*</em>
                  </span>
                  <input
                    required
                    autoComplete="organization"
                    value={form.businessName}
                    onChange={(e) => setField('businessName', e.target.value)}
                    placeholder="e.g. Bahir Dar Café"
                  />
                </label>

                <label className="project-field sm:col-span-2">
                  <span>
                    Phone number <em>*</em>
                  </span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    placeholder="+251 ..."
                  />
                </label>

                <label className="project-field">
                  <span>Your name</span>
                  <input
                    autoComplete="name"
                    value={form.contactName}
                    onChange={(e) => setField('contactName', e.target.value)}
                    placeholder="Optional"
                  />
                </label>

                <label className="project-field">
                  <span>Business type</span>
                  <select
                    value={form.businessType}
                    onChange={(e) => setField('businessType', e.target.value)}
                  >
                    <option value="">Select (optional)</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="project-field sm:col-span-2">
                  <span>Address</span>
                  <input
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => setField('address', e.target.value)}
                    placeholder="City / area (optional)"
                  />
                </label>
              </div>

              <fieldset className="project-field">
                <legend>What do you want us to build?</legend>
                <div className="project-chips">
                  {WEBSITE_OPTIONS.map((opt) => {
                    const active = form.websiteTypes.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`project-chip ${active ? 'is-active' : ''}`}
                        onClick={() => toggleWebsiteType(opt)}
                        aria-pressed={active}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <label className="project-field">
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder="Timeline, budget, or anything else (optional)"
                />
              </label>

              {error && (
                <p className="type-caption text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-touch w-full rounded-full bg-brand text-white font-semibold type-label hover:bg-brand-dark transition-colors disabled:opacity-60 gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Confirming…
                  </>
                ) : (
                  'Confirm order'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
