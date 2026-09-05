import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-16 pb-8 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: MSTI ACADEMY */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">MSTI ACADEMY</h3>
            <p className="text-navy-400 text-xs leading-relaxed mb-6">
              Sri Lanka's flagship institution for merchant navy cadet training, nautical science, and maritime engineering excellence.
            </p>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              ACCREDITATIONS & OVERSIGHT
            </h4>
            <p className="text-navy-400 text-[10px] leading-relaxed">
              IMO Compliant (STCW) • Merchant Shipping Secretariat (DG Shipping SL) • ISO 9001:2015 Bureau Veritas Certified
            </p>
          </div>

          {/* Column 2: Academy Campus */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Academy Campus</h3>
            <p className="text-navy-400 text-xs leading-relaxed mb-6">
              MSTI Maritime Enclave, Harbour<br/>
              Promenade Road, Colombo Port Zone 01,<br/>
              Sri Lanka
            </p>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              INTERNATIONAL CADET DESK
            </h4>
            <p className="text-navy-400 text-xs leading-relaxed">
              Hotline: +94 11 242 8900<br/>
              Admissions: admissions@msti.edu.lk
            </p>
          </div>

          {/* Column 3: Quick Access */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Quick Access</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home Landing', to: '/' },
                { label: 'About the Academy', to: '/about' },
                { label: 'Pre-Sea & Officer Cadet Programs', to: '/courses' },
                { label: 'Maritime News & Commencements', to: '/news' },
                { label: 'Simulators & Training Fleet', to: '/about' },
                { label: 'Cadet Application Portal', to: '/contact' },
                { label: 'Admin Portal Login', to: '/admin/login' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-navy-400 text-xs hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Cadet Gazette */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Cadet Gazette</h3>
            <p className="text-navy-400 text-xs leading-relaxed mb-4">
              Subscribe for batch commencement schedules, fleet partner placement alerts, and sea-time regulations.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Cadet or parent email"
                className="bg-navy-900 border border-navy-800 text-white text-xs px-4 py-3 rounded focus:outline-none focus:border-blue-500 transition-colors placeholder:text-navy-500 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-3 rounded transition-colors w-full"
              >
                Subscribe to Dispatches
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-500 text-[10px]">
            &copy; {new Date().getFullYear()} Maritime Skills & Training Institute (MSTI). All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] text-navy-500">
            <Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-blue-400 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
