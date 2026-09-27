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
              Established In 1986, Mercmarine Is The First Private Maritime Training Facility In Sri Lanka. The Wealth Of Experience Is Channeled Towards Providing The Best Possible Training For Students.
            </p>
            <div className="pt-2 border-t border-navy-900">
              <h4 className="text-white text-[11px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-blue-400">
                <FiShield size={13} /> ACCREDITATIONS
              </h4>
              <p className="text-navy-400 text-[11px] leading-relaxed">
                DGMS Approved • ISO 9001:2015 Certified • TVEC Approved
              </p>
            </div>
            
            <div className="pt-2 flex items-center gap-3">
              <a href="https://facebook.com/MercmarineTraining" target="_blank" rel="noreferrer" className="text-navy-400 hover:text-blue-500 transition-colors">
                Facebook
              </a>
              <span className="text-navy-800">|</span>
              <a href="https://instagram.com/msti.maritimeacademy" target="_blank" rel="noreferrer" className="text-navy-400 hover:text-pink-500 transition-colors">
                Instagram
              </a>
              <span className="text-navy-800">|</span>
              <a href="https://linkedin.com/school/mstimaritimeacademysl" target="_blank" rel="noreferrer" className="text-navy-400 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Awards', to: '/about' }, // Added to about page
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link, i) => (
                <li key={`q1-${i}`}>
                  <Link to={link.to} className="text-navy-400 text-xs hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span className="text-navy-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Student Life
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Student Life', to: '/about' },
                { label: 'Alumni', to: '/about' },
                { label: 'Career Growth', to: '/courses' },
                { label: 'Journal', to: '/news' },
              ].map((link, i) => (
                <li key={`q2-${i}`}>
                  <Link to={link.to} className="text-navy-400 text-xs hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span className="text-navy-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Certificate Verification */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Contact Us
            </h3>
            <div className="space-y-2 text-xs text-navy-300">
                <p>MSTI Maritime Academy,<br/>No. 32, Station Road,<br/>Dehiwala, Sri Lanka.</p>
                <p className="pt-2">
                  <a href="tel:+94117476100" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Phone: +94 11 747 6100
                  </a>
                </p>
                <p>
                  <a href="mailto:helpdesk@msti.lk" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Email: helpdesk@msti.lk
                  </a>
                </p>
            </div>
            
            <div className="pt-4">
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-navy-400">
          <p>
            &copy; {new Date().getFullYear()} MSTI Maritime Academy. All Rights Reserved.
          </p>
          <div className="flex gap-5 text-xs">
             <Link to="/courses" className="hover:text-blue-400 transition-colors">Short Courses</Link>
             <Link to="/courses" className="hover:text-blue-400 transition-colors">Officer & Rating Training</Link>
          </div>
        </div>
      </div>

      {/* Certificate Verification Modal */}
      <CertificateModal isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </footer>
  )
}
