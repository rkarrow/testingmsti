import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiLock, FiMail, FiAnchor, FiAlertCircle } from 'react-icons/fi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/login', { email, password })
      if (res.data.success) {
        localStorage.setItem('msti_admin_token', res.data.token)
        localStorage.setItem('msti_admin_user', JSON.stringify(res.data.user))
        navigate('/admin')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-navy-900 p-8 md:p-10 rounded-2xl shadow-2xl border border-navy-800 relative overflow-hidden">
        {/* Glow accent background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
            <FiAnchor size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-sm text-navy-300">
            Sign in to access MSTI Maritime Content Management
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-xs flex items-center gap-2">
            <FiAlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-navy-950 border border-navy-800 rounded-lg text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  placeholder="admin@msti.lk"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy-400">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-navy-950 border border-navy-800 rounded-lg text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-600/30 transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-navy-400">
          Default Login: <span className="text-blue-400 font-mono">admin@msti.lk</span> / <span className="text-blue-400 font-mono">admin123</span>
        </div>
      </div>
    </div>
  )
}
