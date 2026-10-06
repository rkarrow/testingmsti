import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FiLock,
  FiMail,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiAnchor,
  FiShield,
  FiKey,
  FiCheckCircle,
  FiArrowLeft,
  FiRefreshCw,
} from 'react-icons/fi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Forgot Password Mode State
  const [showForgot, setShowForgot] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMsg, setResetMsg] = useState({ type: '', text: '' })

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
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

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setResetMsg({ type: '', text: '' })

    if (!resetEmail || !newPassword) {
      setResetMsg({ type: 'error', text: 'Please fill in all fields.' })
      return
    }

    if (newPassword.length < 6) {
      setResetMsg({ type: 'error', text: 'New password must be at least 6 characters long.' })
      return
    }

    if (newPassword !== confirmPassword) {
      setResetMsg({ type: 'error', text: 'Passwords do not match. Please re-enter.' })
      return
    }

    setResetLoading(true)
    try {
      const res = await axios.post('/api/auth/reset-password', {
        email: resetEmail,
        newPassword,
        confirmPassword,
      })

      if (res.data.success) {
        setSuccessMsg('Password reset successfully! Please sign in with your new password below.')
        setShowForgot(false)
        setPassword(newPassword)
        setEmail(resetEmail)
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      setResetMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to reset password. Please try again.',
      })
    } finally {
      setResetLoading(false)
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
              <FiAnchor size={24} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-xl tracking-tight">MSTI</div>
              <div className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
                Maritime Academy
              </div>
            </div>
          </div>
        </div>

        {/* Center badge */}
        <div className="relative z-10 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <FiShield size={14} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">
              Secure Admin Portal
            </span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Content
            <br />
            <span className="text-blue-400">Management</span>
            <br />
            System
          </h1>
          <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
            Manage courses, news, contact information, and all website content from one secure dashboard.
          </p>

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

        <div className="relative z-10">
          <p className="text-navy-500 text-xs">
            © 2026 MSTI Maritime Academy. Sri Lanka's Premier Maritime Training Institute.
          </p>
        </div>

        <div className="absolute top-1/3 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      {/* RIGHT PANEL - Login / Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-navy-950">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FiAnchor size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-base">MSTI Admin</div>
              <div className="text-navy-400 text-xs">Control Panel</div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-black text-white mb-1.5 tracking-tight">
              {showForgot ? 'Reset Password' : 'Welcome back'}
            </h2>
            <p className="text-navy-400 text-sm">
              {showForgot
                ? 'Enter your email and create a new secure password'
                : 'Sign in to access the MSTI Admin Dashboard'}
            </p>
          </div>

          {/* Success Message Banner */}
          {successMsg && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-4 py-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5">
              <FiCheckCircle size={17} className="shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Message Banner */}
          {error && !showForgot && (
            <div className="mb-6 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3.5 rounded-xl text-sm flex items-start gap-3">
              <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FORGOT / RESET PASSWORD FORM */}
          {showForgot ? (
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-4">
              {resetMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
                    resetMsg.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {resetMsg.type === 'success' ? <FiCheckCircle size={15} /> : <FiAlertCircle size={15} />}
                  <span>{resetMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-1">
                    Admin Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-500">
                      <FiMail size={15} />
                    </div>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs placeholder-navy-600 focus:outline-none focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-500">
                      <FiLock size={15} />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs placeholder-navy-600 focus:outline-none focus:border-blue-500"
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-white cursor-pointer"
                    >
                      {showNewPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-500">
                      <FiLock size={15} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs placeholder-navy-600 focus:outline-none focus:border-blue-500"
                      placeholder="Re-type new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-white cursor-pointer"
                    >
                      {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="w-1/3 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FiArrowLeft size={14} /> Back
                  </button>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {resetLoading ? <FiRefreshCw className="animate-spin" size={14} /> : <FiKey size={14} />}
                    {resetLoading ? 'Saving...' : 'Reset & Save Password'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* STANDARD LOGIN FORM */
            <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
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
                    className="w-full pl-11 pr-4 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                    className="w-full pl-11 pr-12 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="••••••••"
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

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <FiRefreshCw className="animate-spin" size={16} />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <FiShield size={16} />
                    Sign In Securely
                  </>
                )}
              </button>

              {/* FORGOT PASSWORD BUTTON BELOW SIGN IN */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true)
                    setError('')
                    setSuccessMsg('')
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiKey size={13} /> Forgot password? / Reset Password
                </button>
              </div>
            </form>
          )}

          {/* Security note */}
          <div className="mt-6 flex items-center gap-3 p-4 bg-navy-900/50 border border-navy-800 rounded-xl">
            <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0">
              <FiShield size={16} className="text-blue-400" />
            </div>
            <p className="text-navy-400 text-xs leading-relaxed">
              This is a secure admin area. Unauthorized access attempts are logged and monitored.
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-navy-600 text-xs mt-6">
            MSTI Maritime Academy — Admin Control Panel
          </p>
        </div>
      </div>
    </div>
  )
}
