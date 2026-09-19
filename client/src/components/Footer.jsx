import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiShield, FiAward } from 'react-icons/fi'

export default function Footer() {
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

          {/* Column 2: Campus & Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Dehiwala Main Campus
            </h3>
            
            <div className="space-y-2.5 text-xs text-navy-300">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-blue-400 shrink-0 mt-0.5" size={15} />
                <span>No. 32, Station Road, Dehiwala 10350, Sri Lanka</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-blue-400 shrink-0" size={14} />
                <a href="tel:+94117476100" className="hover:text-white transition-colors font-medium">
                  +94 11 747 6100
                </a>
              </div>
              
              <div className="flex items-center gap-2.5">
                <FiMail className="text-blue-400 shrink-0" size={14} />
                <a href="mailto:helpdesk@msti.lk" className="hover:text-white transition-colors">
                  helpdesk@msti.lk
                </a>
              </div>
            </div>

            {/* Certificate Verification CTA */}
            <div className="pt-2">
              <a
                href="mailto:certificate@msti.lk?subject=Certificate%20Verification%20Request"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all w-full justify-center group"
              >
                <FiCheckCircle size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                Certificate Verification
              </a>
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

        {/* Bottom Bar */}
        <div className="border-t border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-navy-400">
          <p>
            &copy; {new Date().getFullYear()} MSTI Maritime Academy Dehiwala. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="/about" className="hover:text-blue-400 transition-colors">DGMS Approval</Link>
            <Link to="/courses" className="hover:text-blue-400 transition-colors">STCW Programs</Link>
            <a href="mailto:certificate@msti.lk" className="hover:text-blue-400 transition-colors">Certificate Verification</a>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Dehiwala Main</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
