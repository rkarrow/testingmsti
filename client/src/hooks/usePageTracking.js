import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// Generate or reuse a session ID (persists for browser tab lifetime)
function getSessionId() {
  let sid = sessionStorage.getItem('msti_sid')
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('msti_sid', sid)
  }
  return sid
}

export default function usePageTracking() {
  const location = useLocation()
  const lastPath = useRef(null)

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return
    // Don't track same page twice in a row
    if (lastPath.current === location.pathname) return
    lastPath.current = location.pathname

    const sessionId = getSessionId()
    const referrer = document.referrer || ''

    // Fire and forget — never blocks or breaks the site
    axios.post('/api/track', {
      page: location.pathname,
      referrer,
      sessionId,
    }).catch(() => {})
  }, [location.pathname])
}
