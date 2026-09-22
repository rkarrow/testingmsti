import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiAnchor, FiPhone, FiMail } from 'react-icons/fi'
import CertificateModal from './CertificateModal'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/news', label: 'News' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [certModalOpen, setCertModalOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Top Info Bar / Podi Thiruwa */}
      <div className="bg-navy-950 text-navy-200 text-xs py-2 px-4 border-b border-navy-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <FiAnchor size={13} className="text-amber-400" /> DGMS APPROVED & ISO 9001:2015 CERTIFIED ACADEMY
            </span>
            <span className="text-navy-700">|</span>
            <span className="text-navy-300">📍 No. 32, Station Road, Dehiwala 10350, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-navy-300">
            <a href="tel:+94117476100" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiPhone size={12} className="text-blue-400" /> +94 11 747 6100
            </a>
            <a href="mailto:helpdesk@msti.lk" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiMail size={12} className="text-blue-400" /> helpdesk@msti.lk
            </a>
            <button
              type="button"
              onClick={() => setCertModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium border-l border-navy-700 pl-4 cursor-pointer"
            >
              Certificate Verification
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/msti-logo.png" alt="MSTI Maritime Academy" className="h-14 w-auto object-contain" />
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
                      ? 'text-blue-400'
                      : 'text-navy-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-600/25">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy-300 p-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive ? 'text-blue-400 bg-blue-600/10' : 'text-navy-300 hover:text-white hover:bg-navy-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-navy-800 flex gap-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-sm font-semibold py-2.5 px-6 rounded-lg text-center flex-1"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Certificate Verification Modal */}
      <CertificateModal isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </header>
  )
}
