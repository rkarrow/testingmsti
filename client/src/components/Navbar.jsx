import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiAnchor, FiPhone, FiMail } from 'react-icons/fi'
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa'
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
          <div className="flex items-center gap-5 text-xs text-navy-300">
            {/* Social Media Backlinks */}
            <div className="flex items-center gap-2.5 pr-2 border-r border-navy-800">
              <a
                href="https://youtube.com/@mstimaritimeacademy?si=pXilsRZIagsjp4O7"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="text-red-500 hover:text-red-400 hover:scale-110 transition-all p-1"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://www.facebook.com/MercmarineTraining/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="text-blue-500 hover:text-blue-400 hover:scale-110 transition-all p-1"
              >
                <FaFacebook size={14} />
              </a>
              <a
                href="https://www.instagram.com/msti.maritimeacademy/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="text-pink-500 hover:text-pink-400 hover:scale-110 transition-all p-1"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://lk.linkedin.com/school/mstimaritimeacademysl/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-sky-400 hover:text-sky-300 hover:scale-110 transition-all p-1"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href="https://www.tiktok.com/@mediamsti"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="text-gray-200 hover:text-white hover:scale-110 transition-all p-1"
              >
                <FaTiktok size={13} />
              </a>
            </div>

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
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
          {/* Logo - Enlarged for clearer branding */}
          <Link to="/" className="flex items-center py-2">
            <img
              src="/msti-logo.jpg"
              alt="MSTI Maritime Academy"
              className="h-20 sm:h-22 w-auto object-contain transition-transform hover:scale-105 duration-200"
            />
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
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-sm font-semibold py-2.5 px-6 rounded text-center"
              >
                Apply Now
              </Link>
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://youtube.com/@mstimaritimeacademy?si=pXilsRZIagsjp4O7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-base"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.facebook.com/MercmarineTraining/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/msti.maritimeacademy/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center text-base"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://lk.linkedin.com/school/mstimaritimeacademysl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-base"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.tiktok.com/@mediamsti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-base"
                >
                  <FaTiktok />
                </a>
              </div>
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
