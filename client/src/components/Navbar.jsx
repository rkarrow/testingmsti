import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiAnchor, FiPhone, FiMail } from 'react-icons/fi'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Top Info Bar / Podi Thiruwa */}
      <div className="bg-navy-950 text-navy-200 text-xs py-2 px-4 border-b border-navy-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <FiAnchor size={13} className="text-amber-400" /> IMO STCW & DG SHIPPING APPROVED ACADEMY
            </span>
            <span className="text-navy-700">|</span>
            <span className="text-navy-300">Merchant Navy Officer Training & Nautical Science</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-navy-300">
            <a href="tel:+94112428900" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiPhone size={12} className="text-blue-400" /> +94 11 242 8900
            </a>
            <a href="mailto:admissions@msti.edu.lk" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiMail size={12} className="text-blue-400" /> admissions@msti.edu.lk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="MSTI Maritime Academy" className="h-12 w-auto object-contain mix-blend-multiply" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors relative py-2 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-navy-800 hover:text-blue-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded transition-colors">
              Apply Now
            </Link>
            <Link to="/admin" className="w-10 h-10 bg-navy-950 hover:bg-navy-800 rounded-full flex items-center justify-center text-white transition-colors" title="Admin Portal">
              <FiUser size={18} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-navy-800 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100 flex gap-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-sm font-semibold py-2.5 px-6 rounded text-center flex-1"
              >
                Apply Now
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-navy-950 rounded flex items-center justify-center text-white flex-shrink-0"
              >
                <FiUser size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
      </nav>
    </header>
  )
}
