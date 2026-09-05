import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FiHome, FiBookOpen, FiFileText, FiMail, FiSliders, FiLogOut, FiAnchor, FiExternalLink, FiUser } from 'react-icons/fi'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('msti_admin_token')
    const userData = localStorage.getItem('msti_admin_user')
    if (!token) {
      navigate('/admin/login')
    } else if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('msti_admin_token')
    localStorage.removeItem('msti_admin_user')
    navigate('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin', icon: FiHome, end: true },
    { label: 'Hero & Content Editor', path: '/admin/hero', icon: FiSliders },
    { label: 'Courses Management', path: '/admin/courses', icon: FiBookOpen },
    { label: 'News & Announcements', path: '/admin/news', icon: FiFileText },
    { label: 'Contact Inquiries', path: '/admin/contacts', icon: FiMail },
  ]

  return (
    <div className="min-h-screen bg-navy-950 text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-navy-900 border-r border-navy-800 flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <FiAnchor size={20} />
            </div>
            <div>
              <h1 className="font-bold text-base leading-none text-white">MSTI Admin</h1>
              <span className="text-[10px] text-blue-400 font-medium">Control Panel</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Website Preview Link & User Info */}
        <div className="p-4 border-t border-navy-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2.5 bg-navy-950 hover:bg-navy-800 border border-navy-800 rounded-xl text-xs font-semibold text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiExternalLink size={14} /> View Live Website
            </span>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-navy-300 shrink-0">
                <FiUser size={16} />
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-navy-400 truncate">{user?.email || 'admin@msti.lk'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-navy-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-navy-900 border-b border-navy-800 px-8 flex items-center justify-between">
          <div className="text-sm font-semibold text-navy-200">
            MSTI Maritime Academy Content Management System
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Backend Active
            </span>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-navy-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
