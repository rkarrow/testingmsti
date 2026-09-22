import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiLock, FiMail, FiAlertCircle, FiEye, FiEyeOff, FiAnchor, FiShield } from 'react-icons/fi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/login', { email, password }, { timeout: 45000 })
      if (res.data.success) {
        localStorage.setItem('msti_admin_token', res.data.token)
        localStorage.setItem('msti_admin_user', JSON.stringify(res.data.user))
        navigate('/admin')
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED' || !err.response) {
        setError('Server is starting up. Please wait ~30 seconds and try again.')
      } else {
        setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* LEFT PANEL - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200"
            alt="MSTI Maritime"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-blue-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
              <FiAnchor size={24} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-xl tracking-tight">MSTI</div>
              <div className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Maritime Academy</div>
            </div>
          </div>
        </div>

        {/* Center badge */}
        <div className="relative z-10 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <FiShield size={14} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">Secure Admin Portal</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Content<br />
            <span className="text-blue-400">Management</span><br />
            System
          </h1>
          <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
            Manage courses, news, contact information, and all website content from one secure dashboard.
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mt-8">
            {[
              { value: '100%', label: 'Secure Access' },
              { value: '24/7', label: 'Live Updates' },
              { value: 'CMS', label: 'Full Control' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-white font-black text-lg">{stat.value}</div>
                <div className="text-navy-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-navy-500 text-xs">
            © 2024 MSTI Maritime Academy. Sri Lanka's Premier Maritime Training Institute.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-navy-950">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FiAnchor size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-base">MSTI Admin</div>
              <div className="text-navy-400 text-xs">Control Panel</div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-navy-400 text-sm">
              Sign in to access the MSTI Admin Dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3.5 rounded-xl text-sm flex items-start gap-3">
              <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} autoComplete="off" className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-navy-300 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-500">
                  <FiMail size={17} />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-navy-900 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-navy-300 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-500">
                  <FiLock size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-navy-900 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-navy-500 hover:text-navy-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <FiShield size={16} />
                  Sign In Securely
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-8 flex items-center gap-3 p-4 bg-navy-900/50 border border-navy-800 rounded-xl">
            <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0">
              <FiShield size={16} className="text-blue-400" />
            </div>
            <p className="text-navy-400 text-xs leading-relaxed">
              This is a secure admin area. Unauthorized access attempts are logged and monitored.
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-navy-600 text-xs mt-8">
            MSTI Maritime Academy — Admin Control Panel
          </p>
        </div>
      </div>
    </div>
  )
}
