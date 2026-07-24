import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Send, Loader2 } from 'lucide-react'
import { api } from '../api'

const WELCOME =
  'Hi! Ask me about our services, projects, or how to start a project.'

const FALLBACK =
  "Sorry, I'm having trouble right now — please reach us directly at +251 89886956 or via WhatsApp."

const FOREST = '#1F3B22'

/** Tendril chat mark — vine bubble for the launcher button only */
function TendrilChatMark({ size = 26, color = FOREST, strokeWidth = 2.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M12 14
           C12 10.5 14.8 8 18.5 8
           H29.5
           C33.6 8 37 11 37 15
           V21
           C37 25 33.6 28 29.5 28
           H21.5
           L21.5 28"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 14 V21 C12 24.5 14.6 27.3 18 27.9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 28
           C19 32 14.5 32 14 36
           C13.7 38.3 16 39.4 17.4 38
           C18.6 36.8 17 35.3 15.7 36.4"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21 17 C22.5 15.5 24.5 15.5 25 17.5 C25.4 19 23.5 19.5 22.5 18.3"
        stroke={color}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M28 17 C29.5 15.5 31.5 15.5 32 17.5 C32.4 19 30.5 19.5 29.5 18.3"
        stroke={color}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function SupportChat() {
  const titleId = useId()
  const listRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: WELCOME },
  ])

  useEffect(() => {
    if (!open || !listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open, busy])

  const send = async (e) => {
    e?.preventDefault?.()
    const text = input.trim()
    if (!text || busy) return

    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text }
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }))

    setInput('')
    setMessages((prev) => [...prev, userMsg])
    setBusy(true)

    try {
      const data = await api.chat(text, history)
      const reply = String(data?.reply || '').trim() || FALLBACK
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: reply },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: err?.message?.includes('Too many') ? err.message : FALLBACK,
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="support-chat" aria-live="polite">
      {open && (
        <section
          className="support-chat__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <header className="support-chat__header">
            <div>
              <p className="font-mono type-caption text-white/80 uppercase tracking-widest">
                Hareg Tech
              </p>
              <h2 id={titleId} className="font-semibold text-white text-base">
                Support assistant
              </h2>
            </div>
            <button
              type="button"
              className="support-chat__icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>

          <div className="support-chat__messages" ref={listRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`support-chat__bubble support-chat__bubble--${m.role}`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="support-chat__bubble support-chat__bubble--assistant support-chat__typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <form className="support-chat__form" onSubmit={send}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, products…"
              maxLength={1500}
              disabled={busy}
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="support-chat__send"
              disabled={busy || !input.trim()}
              aria-label="Send message"
            >
              {busy ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`support-chat__fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close support chat' : 'Open support chat'}
        aria-expanded={open}
      >
        <span className="support-chat__fab-ring" aria-hidden="true" />
        {open ? (
          <span className="support-chat__fab-close" aria-hidden="true">
            ×
          </span>
        ) : (
          <>
            <TendrilChatMark size={30} color={FOREST} strokeWidth={2.6} />
            <span className="support-chat__fab-label">Chat</span>
          </>
        )}
      </button>
    </div>,
    document.body,
  )
}
