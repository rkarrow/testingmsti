import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiEye, FiAward, FiUsers, FiMapPin } from 'react-icons/fi'
import CTASection from '../components/CTASection'

const stats = [
  { value: '100+', label: 'Graduates' },
  { value: '150+', label: 'Partners' },
  { value: '18+', label: 'Years' },
  { value: '$4.3M', label: 'Invested' },
]

const leadership = [
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

const facilities = [
  {
    title: 'Full-Mission Bridge Simulator',
    desc: '360° full-mission bridge simulator with realistic sea-state scenarios.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
  },
  {
    title: 'Engine Room Simulator',
    desc: 'Advanced engine room simulation for marine engineering cadets.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500',
  },
  {
    title: 'GMDSS Laboratory',
    desc: 'State-of-the-art Global Maritime Distress and Safety System lab.',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=500',
  },
  {
    title: 'Fire-Fighting Ground',
    desc: 'Real-fire training ground for STCW firefighting certifications.',
    image: 'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=500',
  },
]

export default function About() {
  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600"
            alt="About MSTI"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="badge-blue mb-4">About MSTI</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              About MSTI — The Flagship Maritime Academy in Sri Lanka
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              Since our founding, MSTI has been at the forefront of maritime education in Sri Lanka, producing world-class officers and engineers who serve with distinction in the global maritime industry.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((s, i) => (
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
              <div className="badge-blue mb-4">Our Story</div>
              <h2 className="section-title mb-4">
                The Premier Maritime Academy in Sri Lanka
              </h2>
              <p className="text-navy-400 leading-relaxed mb-4">
                Established with a mandate to elevate maritime education in Sri Lanka, MSTI has grown to become the nation's most respected maritime training institution. Our comprehensive programmes, delivered by experienced maritime professionals, are internationally recognized and industry-endorsed.
              </p>
              <p className="text-navy-400 leading-relaxed mb-4">
                We maintain strategic partnerships with leading international shipping companies, port authorities, and maritime organizations to ensure our curriculum remains current, relevant, and aligned with evolving industry demands.
              </p>
              <p className="text-navy-400 leading-relaxed mb-8">
                Every year, our graduates join the ranks of global maritime professionals, serving as officers, engineers, and maritime managers aboard vessels and in ports across more than 50 countries worldwide.
              </p>
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
              <p className="text-navy-400 leading-relaxed mb-4">
                To provide world-class maritime education and training that empowers Sri Lankan seafarers to excel in the global maritime industry, while upholding the highest standards of safety, professionalism, and integrity.
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
              <p className="text-navy-400 leading-relaxed mb-4">
                To be the foremost maritime training institution in South Asia, recognized globally for producing officers of the highest caliber who lead the maritime industry with competence, integrity, and innovation.
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
            {leadership.map((member, i) => (
              <div key={i} className="card group hover-lift text-center overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
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
            {facilities.map((facility, i) => (
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
