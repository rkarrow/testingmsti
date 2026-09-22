import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowRight, FiTarget, FiEye, FiAward, FiUsers, FiMapPin } from 'react-icons/fi'
import CTASection from '../components/CTASection'

const defaultStats = [
  { value: '100+', label: 'Graduates' },
  { value: '150+', label: 'Partners' },
  { value: '18+', label: 'Years' },
  { value: '$4.3M', label: 'Invested' },
]

const defaultLeadership = [
  {
    name: 'Capt. R. Jayawardena',
    role: 'Principal & Commandant',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300',
    rank: 'Master Mariner — FG',
  },
  {
    name: 'Cmdr. S. Perera (Rtd.)',
    role: 'Head of Nautical Science',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    rank: 'Sri Lanka Navy (Rtd.)',
  },
  {
    name: 'Capt. D. Fernando',
    role: 'Head of Marine Engineering',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    rank: 'Chief Engineer — FG',
  },
  {
    name: 'Ms. N. Wijesekera',
    role: 'Director of Admissions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    rank: 'MBA, Maritime Law',
  },
]

export default function About() {
  const [settings, setSettings] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings')
        if (res.data.success && res.data.data) {
          setSettings(res.data.data)
        }
      } catch (e) {
        // use defaults
      }
    }
    fetchSettings()
  }, [])
  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settings?.aboutHeroBgImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600"}
            alt="About MSTI"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="badge-blue mb-4">{settings?.aboutHeroBadge || 'About MSTI'}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {settings?.aboutHeroTitle || 'About MSTI — The Flagship Maritime Academy in Sri Lanka'}
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              {settings?.aboutHeroSubtitle || 'Since our founding, MSTI has been at the forefront of maritime education in Sri Lanka, producing world-class officers and engineers who serve with distinction in the global maritime industry.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {(settings?.aboutStats && settings.aboutStats.length > 0 ? settings.aboutStats : defaultStats).map((s, i) => (
              <div key={i} className="bg-navy-900/70 border border-navy-700 rounded-xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-navy-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500" alt="MSTI" className="rounded-xl h-52 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500" alt="Training" className="rounded-xl h-52 w-full object-cover mt-8" />
              <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500" alt="Cadets" className="rounded-xl h-52 w-full object-cover -mt-4" />
              <img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=500" alt="Excellence" className="rounded-xl h-52 w-full object-cover mt-4" />
            </div>
            <div>
              <div className="badge-blue mb-4">{settings?.aboutBadge || 'Our Story'}</div>
              <h2 className="section-title mb-4">
                {settings?.aboutTitle || 'The Premier Maritime Academy in Sri Lanka'}
              </h2>
              <p className="text-navy-400 leading-relaxed mb-4">
                {settings?.aboutDesc1 || "Established with a mandate to elevate maritime education in Sri Lanka, MSTI has grown to become the nation's most respected maritime training institution. Our comprehensive programmes, delivered by experienced maritime professionals, are internationally recognized and industry-endorsed."}
              </p>
              <p className="text-navy-400 leading-relaxed mb-4">
                {settings?.aboutDesc2 || "We maintain strategic partnerships with leading international shipping companies, port authorities, and maritime organizations to ensure our curriculum remains current, relevant, and aligned with evolving industry demands."}
              </p>
              {settings?.aboutHistory && (
                <p className="text-navy-300 font-medium leading-relaxed mb-8 bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl">
                  📜 {settings.aboutHistory}
                </p>
              )}
              <Link to="/courses" className="btn-primary">
                Explore Our Programmes <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="badge-blue mb-3 mx-auto">Our Direction</div>
            <h2 className="section-title">Mission & Strategic Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-5">
                <FiTarget className="text-blue-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Our Mission</h3>
              <p className="text-navy-300 leading-relaxed mb-4">
                {settings?.aboutMission || "To provide world-class maritime education and training that empowers Sri Lankan seafarers to excel in the global maritime industry, while upholding the highest standards of safety, professionalism, and integrity."}
              </p>
              <ul className="space-y-3">
                {[
                  'Deliver internationally recognized maritime qualifications',
                  'Foster a culture of safety and professional excellence',
                  'Build strong industry partnerships for career pathways',
                  'Contribute to Sri Lanka\'s maritime economy and heritage',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-navy-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-5">
                <FiEye className="text-blue-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Our Vision</h3>
              <p className="text-navy-300 leading-relaxed mb-4">
                {settings?.aboutVision || "To be the foremost maritime training institution in South Asia, recognized globally for producing officers of the highest caliber who lead the maritime industry with competence, integrity, and innovation."}
              </p>
              <ul className="space-y-3">
                {[
                  'Achieve regional leadership in maritime education by 2030',
                  'Expand programme offerings to cover emerging maritime technologies',
                  'Establish MSTI as a center of maritime research excellence',
                  'Create 1,000+ maritime career opportunities annually',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-navy-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY LEADERSHIP */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="badge-blue mb-3 mx-auto">Our Team</div>
            <h2 className="section-title">Academy Leadership</h2>
            <p className="text-navy-400 mt-2 max-w-xl mx-auto">
              Led by experienced mariners and maritime educators with decades of industry experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(settings?.leadership && settings.leadership.length > 0 ? settings.leadership : defaultLeadership).map((member, i) => (
              <div
                key={i}
                onClick={() => setSelectedMember(member)}
                className="card group hover-lift text-center overflow-hidden cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-sm">{member.name}</h3>
                  <p className="text-blue-400 text-xs mt-1 font-medium">{member.role}</p>
                  <p className="text-navy-500 text-xs mt-1">{member.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP POPUP MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
          <div
            className="relative z-10 bg-navy-900 border border-navy-700 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl shadow-black/50"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-navy-800 hover:bg-navy-700 rounded-full flex items-center justify-center text-navy-400 hover:text-white transition-colors cursor-pointer text-sm"
            >
              ✕
            </button>
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white font-black text-xl leading-tight">{selectedMember.name}</h2>
                <p className="text-blue-400 text-sm font-semibold mt-1">{selectedMember.role}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 bg-navy-800/60 rounded-xl p-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <FiAward size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-navy-400 text-[10px] font-semibold uppercase tracking-wider">Qualification / Rank</div>
                  <div className="text-white text-sm font-semibold">{selectedMember.rank}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-navy-800/60 rounded-xl p-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <FiUsers size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-navy-400 text-[10px] font-semibold uppercase tracking-wider">Position</div>
                  <div className="text-white text-sm font-semibold">{selectedMember.role}</div>
                </div>
              </div>
              {selectedMember.bio && (
                <div className="bg-navy-800/40 border border-navy-700 rounded-xl p-4">
                  <p className="text-navy-300 text-sm leading-relaxed">{selectedMember.bio}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-navy-500 text-xs">MSTI Maritime Academy — Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FACILITIES */}
      <section className="py-20 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="badge-blue mb-3 mx-auto">Infrastructure</div>
            <h2 className="section-title">State-of-the-Art Facilities</h2>
            <p className="text-navy-400 mt-2 max-w-xl mx-auto">
              Our campus is equipped with world-class training equipment designed to replicate real maritime environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(settings?.facilities && settings.facilities.length > 0 ? settings.facilities : [
              { title: '360° Full Mission Bridge Simulator', desc: 'Industry-leading bridge simulation technology providing realistic ship handling scenarios for officer trainees.', image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=500' },
              { title: 'Engine Room Simulator', desc: 'State-of-the-art engine room simulation facility for marine engineering trainees.', image: 'https://images.unsplash.com/photo-1581094794329-c8112d4e5f9e?w=500' },
              { title: 'GMDSS Radio Laboratory', desc: 'Fully equipped Global Maritime Distress & Safety System laboratory for communications training.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500' },
              { title: 'Survival Craft Training Pool', desc: 'Professional training facility for liferaft deployment, sea survival, and rescue operations.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500' },
            ]).map((facility, i) => (
              <div key={i} className="card group hover-lift">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">{facility.title}</h3>
                  <p className="text-navy-400 text-xs leading-relaxed">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Maritime Journey?"
        subtitle="Applications for our next intake are now open. Join a legacy of maritime excellence."
        primaryLabel="Apply Now"
        primaryTo="/contact"
        secondaryLabel="View Courses"
        secondaryTo="/courses"
      />
    </div>
  )
}
