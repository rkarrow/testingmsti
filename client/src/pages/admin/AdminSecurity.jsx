import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FiLock,
  FiKey,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiSave,
  FiUser,
  FiCheck,
  FiActivity,
  FiRefreshCw,
} from 'react-icons/fi'

export default function AdminSecurity() {
  const [user, setUser] = useState({ name: 'MSTI Admin', email: 'admin@msti.lk', role: 'Administrator' })
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    const savedUser = localStorage.getItem('msti_admin_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {}
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })

    if (!formData.currentPassword || !formData.newPassword) {
      setMsg({ type: 'error', text: 'Please fill in all password fields.' })
      return
    }

    if (formData.newPassword.length < 6) {
      setMsg({ type: 'error', text: 'New password must be at least 6 characters long.' })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMsg({ type: 'error', text: 'New password and confirm password do not match.' })
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.put('/api/auth/change-password', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success) {
        setMsg({ type: 'success', text: res.data.message || 'Password successfully updated and encrypted!' })
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (err) {
      setMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update password. Please check current password.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Calculate password strength indicator
  const getPasswordStrength = () => {
    const p = formData.newPassword
    if (!p) return { score: 0, text: '', color: 'bg-navy-800' }
    let score = 0
    if (p.length >= 6) score++
    if (p.length >= 10) score++
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++

    if (score <= 2) return { score: 1, text: 'Weak', color: 'bg-red-500' }
    if (score <= 4) return { score: 2, text: 'Medium', color: 'bg-amber-500' }
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' }
  }

  const strength = getPasswordStrength()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <FiShield className="text-blue-500" /> Account Security & Password Manager
        </h1>
        <p className="text-navy-300 text-xs mt-1">
          Manage your administrator credentials, update security keys, and monitor active protection layers.
        </p>
      </div>

      {/* Status Message */}
      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 border transition-all ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {msg.type === 'success' ? <FiCheckCircle size={18} className="shrink-0" /> : <FiAlertCircle size={18} className="shrink-0" />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CHANGE PASSWORD FORM */}
        <div className="md:col-span-7 bg-navy-900 border border-navy-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="border-b border-navy-800 pb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FiKey className="text-amber-400" /> Change Admin Password
            </h2>
            <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 font-semibold uppercase tracking-wider">
              Bcrypt Hashed
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1.5">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  name="currentPassword"
                  required
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-3 text-xs text-white placeholder-navy-600 focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showCurrent ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1.5">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-3 text-xs text-white placeholder-navy-600 focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showNew ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {formData.newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-navy-400">Password Strength:</span>
                    <span className={`font-bold ${strength.score === 3 ? 'text-emerald-400' : strength.score === 2 ? 'text-amber-400' : 'text-red-400'}`}>
                      {strength.text}
                    </span>
                  </div>
                  <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-navy-800'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-navy-800'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-navy-800'}`}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1.5">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type new password"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-3 text-xs text-white placeholder-navy-600 focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
              {loading ? 'Securing Password...' : 'Update & Encrypt Password'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: PROFILE & ACTIVE SECURITY STATUS */}
        <div className="md:col-span-5 space-y-6">
          {/* Active Admin Profile Card */}
          <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FiUser size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{user?.name || 'MSTI Administrator'}</h3>
                <p className="text-xs text-navy-400">{user?.email || 'admin@msti.lk'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-navy-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-navy-400">
                <span>Account Role</span>
                <span className="text-white font-semibold capitalize">{user?.role || 'Super Admin'}</span>
              </div>
              <div className="flex items-center justify-between text-navy-400">
                <span>Security Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Protected
                </span>
              </div>
            </div>
          </div>

          {/* Active Defense Shield Status */}
          <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FiActivity className="text-emerald-400" /> Active Security Shields
            </h3>

            <ul className="space-y-3">
              {[
                { label: 'Bcrypt Hash (Salt 10)', desc: 'Passwords encrypted before storage' },
                { label: 'NoSQL Sanitization', desc: 'Protected against operator injection' },
                { label: 'Brute-Force Rate Limiting', desc: 'Max 15 attempts / 15 mins' },
                { label: 'JWT Bearer Protection', desc: 'Cryptographically signed tokens' },
                { label: 'HTTP Security (Helmet)', desc: 'XSS, clickjack & MIME protection' },
              ].map((shield, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs">
                  <FiCheck className="text-emerald-400 mt-0.5 shrink-0" size={14} />
                  <div>
                    <span className="text-white font-semibold">{shield.label}</span>
                    <p className="text-[11px] text-navy-400">{shield.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
