const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

const TOKEN_KEY = 'hareg_admin_token'

export function getApiUrl() {
  return API_URL
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (options.auth) {
    const token = getAdminToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export const api = {
  health: () => request('/api/health'),
  createOrder: (body) =>
    request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request('/api/auth/me', { auth: true }),
  listOrders: () => request('/api/orders', { auth: true }),
  updateOrderStatus: (id, status) =>
    request(`/api/orders/${id}/status`, {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify({ status }),
    }),
  chat: (message, history = []) =>
    request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    }),
}

export function openProjectModal() {
  window.dispatchEvent(new CustomEvent('hareg:open-project-modal'))
}

export function openAdminFromModal() {
  window.dispatchEvent(new CustomEvent('hareg:close-project-modal'))
  window.location.assign('/admin')
}
