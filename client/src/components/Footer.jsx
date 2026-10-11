import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiShield, FiAward } from 'react-icons/fi'
import CertificateModal from './CertificateModal'

export default function Footer() {
  const [certModalOpen, setCertModalOpen] = useState(false)
  return (
    <footer className="bg-navy-950 pt-16 pb-8 border-t border-navy-900 text-navy-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: MSTI Maritime Academy Dehiwala */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              MSTI MARITIME ACADEMY
            </h3>
            <p className="text-navy-400 text-xs leading-relaxed">
              Sri Lanka's pioneer private maritime training institute established with a proud legacy since 1986. Dedicated to producing world-class merchant navy officers and ratings.
            </p>
            <div className="pt-2 border-t border-navy-900">
              <h4 className="text-white text-[11px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-blue-400">
                <FiShield size={13} /> ACCREDITATIONS & OVERSIGHT
              </h4>
              <p className="text-navy-400 text-[11px] leading-relaxed">
                DGMS (Merchant Shipping Secretariat SL) Approved • ISO 9001:2015 Certified • IMO STCW Compliant • 360° Full Mission Bridge Simulator Facilities • Engine Simulator Facilities • Modern Class Rooms with Smart Board Facilities
              </p>
            </div>
          </div>

          {/* Column 2: Campus & Training Centers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                MSTI Dehiwala - Main Branch
              </h3>
              <div className="space-y-1.5 text-xs text-navy-300">
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-blue-400 shrink-0 mt-0.5" size={13} />
                  <span>No. 32, Station Road, Dehiwala 10350, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <a href="tel:+94117476100" className="hover:text-white transition-colors flex items-center gap-1">
                    <FiPhone className="text-blue-400 shrink-0" size={12} /> +94 11 747 6100
                  </a>
                  <a href="mailto:helpdesk@msti.lk" className="hover:text-white transition-colors flex items-center gap-1">
                    <FiMail className="text-blue-400 shrink-0" size={12} /> helpdesk@msti.lk
                  </a>
                </div>
              </div>
            </div>

            {/* Kalutara South Training Center */}
            <div className="pt-3 border-t border-navy-900">
              <h4 className="text-white text-xs font-semibold flex items-center gap-1.5 mb-1 text-blue-400">
                <FiMapPin size={13} className="text-amber-400" /> Kalutara South Training Center
              </h4>
              <p className="text-navy-300 text-[11px] leading-relaxed">
                No. 25, St. Sebastian Road, Kalutara South, Sri Lanka
              </p>
              <p className="text-navy-400 text-[10px] mt-0.5">
                Practical Workshops, Basic Seamanship, Seafarer Physical Readiness.
              </p>
            </div>

            {/* Kalutara North Training Center */}
            <div className="pt-3 border-t border-navy-900">
              <h4 className="text-white text-xs font-semibold flex items-center gap-1.5 mb-1 text-blue-400">
                <FiMapPin size={13} className="text-amber-400" /> Kalutara North Training Center
              </h4>
              <p className="text-navy-300 text-[11px] leading-relaxed">
                Mirishenawatta, Ethanamadala, Kalutara North, Sri Lanka
              </p>
              <p className="text-navy-400 text-[10px] mt-0.5">
                Specialized Practical Grounds, Marine Safety Training, Outdoor Exercises.
              </p>
            </div>

            {/* Certificate Verification CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCertModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all w-full justify-center group cursor-pointer"
              >
                <FiCheckCircle size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                Certificate Verification
              </button>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Quick Access
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home Landing', to: '/' },
                { label: 'About Us (History & Vision)', to: '/about' },
                { label: 'Navigation & Engineering Cadetship', to: '/courses' },
                { label: 'STCW & Modular Courses', to: '/courses' },
                { label: 'Latest Maritime News & Notices', to: '/news' },
                { label: 'Contact Us & Campus Locations', to: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-navy-400 text-xs hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span className="text-navy-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter / Admissions Updates */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Admissions Desk
            </h3>
            <p className="text-navy-400 text-xs leading-relaxed">
              Stay updated on upcoming batch commencement dates, GCE A/L cadetship intakes, and DGMS regulations.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-navy-900 border border-navy-800 text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder:text-navy-500 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors w-full shadow-lg shadow-blue-600/20"
              >
                Subscribe for Intake Updates
              </button>
            </form>
          </div>
        </div>

        {/* Official Media Channels & Bottom Bar */}
        <div className="border-t border-navy-900 pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Official Media Channels
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://youtube.com/@mstimaritimeacademy?si=pXilsRZIagsjp4O7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-red-500/50 text-navy-200 hover:text-white text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-[#FF0000]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>

              <a
                href="https://www.facebook.com/MercmarineTraining/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-blue-500/50 text-navy-200 hover:text-white text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/mstimaritimeacademy/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-pink-500/50 text-navy-200 hover:text-white text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-[#E4405F]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://lk.linkedin.com/school/mstimaritimeacademysl/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-sky-500/50 text-navy-200 hover:text-white text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.tiktok.com/@mediamsti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-white/50 text-navy-200 hover:text-white text-xs font-medium transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-xs">
            <Link to="/about" className="hover:text-blue-400 transition-colors">DGMS Approval</Link>
            <Link to="/courses" className="hover:text-blue-400 transition-colors">STCW Programs</Link>
            <button 
              type="button" 
              onClick={() => setCertModalOpen(true)} 
              className="hover:text-blue-400 transition-colors text-xs text-navy-400 cursor-pointer"
            >
              Certificate Verification
            </button>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">MSTI Dehiwala</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-center text-[11px] text-navy-500">
          <p>&copy; {new Date().getFullYear()} MSTI Maritime Academy Dehiwala. All rights reserved.</p>
        </div>
      </div>

      {/* Certificate Verification Modal */}
      <CertificateModal isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </footer>
  )
}
