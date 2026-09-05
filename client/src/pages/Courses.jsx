import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiClock, FiArrowRight, FiCheckCircle, FiStar, FiGlobe, FiShield, FiBook } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import CTASection from '../components/CTASection'

const stats = [
  { value: '100%', label: 'Placement Rate' },
  { value: '180+', label: 'Hiring Partners' },
  { value: '18+', label: 'Countries' },
  { value: 'SC.1', label: 'STCW Compliant' },
]

const disciplines = [
  {
    icon: '⚓',
    title: 'Deck Officer Cadetship',
    desc: 'Comprehensive navigation and bridge management training for aspiring deck officers.',
    duration: '36 Months',
    category: 'Officer Cadetship',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
  },
  {
    icon: '⚙️',
    title: 'Marine Engineering',
    desc: 'Engine room operations, propulsion systems, and marine electrical engineering.',
    duration: '36 Months',
    category: 'Marine Engineering',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500',
  },
  {
    icon: '🗺️',
    title: 'Nautical Science',
    desc: 'Foundation programme covering celestial navigation, meteorology, and COLREGS.',
    duration: '12 Months',
    category: 'Nautical Science',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
  },
  {
    icon: '🏗️',
    title: 'Port & Shipping Management',
    desc: 'Port operations, logistics, shipping economics, and maritime administration.',
    duration: '18 Months',
    category: 'Port Management',
    image: 'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=500',
  },
  {
    icon: '🛡️',
    title: 'Maritime Safety & Security',
    desc: 'STCW-compliant safety training including firefighting and survival at sea.',
    duration: '4 Weeks',
    category: 'Safety & Security',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=500',
  },
  {
    icon: '🎯',
    title: 'Advanced Ship Navigation',
    desc: 'ECDIS, radar, BRM, and passage planning for experienced officers.',
    duration: '6 Months',
    category: 'Specialized Training',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500',
  },
]

const pathway = [
  { step: '01', title: 'Pre-Sea Training', desc: 'Foundation knowledge in seamanship, navigation basics, and maritime safety regulations.', duration: '3 Months' },
  { step: '02', title: 'Shore-Based Learning', desc: 'Intensive classroom and simulator-based training at the MSTI campus.', duration: '12 Months' },
  { step: '03', title: 'Sea Cadetship', desc: 'Practical at-sea training aboard partner shipping company vessels worldwide.', duration: '12 Months' },
  { step: '04', title: 'Advanced Studies', desc: 'Final shore-based modules, examinations, and certification preparation.', duration: '9 Months' },
  { step: '05', title: 'Certification', desc: 'Obtain Certificate of Competency as Officer of the Watch (OOW) — internationally recognized.', duration: 'Upon Completion' },
  { step: '06', title: 'Global Placement', desc: 'Join our partner fleet of 150+ international shipping companies with guaranteed placement.', duration: 'Ongoing' },
]

const medicalStandards = [
  'Vision: Minimum 6/6 corrected or uncorrected',
  'Color vision: No red/green color blindness',
  'Hearing: Adequate for bridge communication',
  'Cardiovascular: No significant cardiac conditions',
  'BMI within acceptable maritime health range',
  'No disqualifying chronic medical conditions',
]

const certifications = [
  { name: 'IMO', label: 'International Maritime Organization' },
  { name: 'STCW', label: 'Standards of Training Certification' },
  { name: 'ISO', label: 'ISO 9001:2015 Certified' },
  { name: 'MoT', label: 'Ministry of Transport Approved' },
]

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Officer Cadetship', 'Marine Engineering', 'Nautical Science', 'Port Management', 'Safety & Security', 'Specialized Training']

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses')
        setCourses(res.data.data)
      } catch (err) {
        console.error('Failed to fetch courses:', err)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const displayCourses = courses.length > 0
    ? (activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory))
    : disciplines.map((d, i) => ({
        _id: i,
        title: d.title,
        shortDescription: d.desc,
        category: d.category,
        duration: d.duration,
        level: 'Certificate',
        image: d.image,
        featured: i < 2,
      }))

  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600"
            alt="Maritime Courses"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="badge-blue mb-4">Programmes</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              World-Class Maritime Training & Officer Cadetships
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              Internationally recognized programmes designed to produce competent, confident maritime professionals ready for immediate global deployment.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-navy-900/70 border border-navy-700 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-navy-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURED DISCIPLINES */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="badge-blue mb-3 mx-auto">Curriculum</div>
            <h2 className="section-title">Structured Maritime Disciplines</h2>
            <p className="text-navy-400 mt-2 max-w-xl mx-auto">
              Choose your pathway from our comprehensive range of maritime programmes.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-navy-800 text-navy-300 hover:text-white hover:bg-navy-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-navy-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-navy-800 rounded w-3/4" />
                    <div className="h-3 bg-navy-800 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PATHWAY TO COMMAND */}
      <section className="py-20 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="badge-blue mb-3 mx-auto">Career Progression</div>
            <h2 className="section-title">Pathway to Command</h2>
            <p className="text-navy-400 mt-2 max-w-xl mx-auto">
              A structured journey from cadet to captain — every step designed for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathway.map((step, i) => (
              <div key={i} className="relative bg-navy-900 border border-navy-700 rounded-2xl p-6 hover:border-blue-500/40 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <span className="text-xs text-navy-400 bg-navy-800 px-2.5 py-1 rounded">{step.duration}</span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBALLY CERTIFIED */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="badge-blue mb-3 mx-auto">Recognition</div>
            <h2 className="section-title">Globally Certified & Exam Launched</h2>
            <p className="text-navy-400 mt-2 max-w-2xl mx-auto">
              Our programmes are recognized and certified by the world's leading maritime authorities, ensuring your qualifications are accepted globally.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-navy-900 border border-navy-700 rounded-2xl p-6 text-center hover:border-blue-500/40 transition-colors">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 font-bold text-lg">{cert.name}</span>
                </div>
                <p className="text-navy-400 text-sm">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CADET ENROLLMENT & MEDICAL */}
      <section className="py-20 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="badge-blue mb-4">Admissions</div>
              <h2 className="text-3xl font-bold text-white mb-4">Cadet Enrolment & Medical Standards</h2>
              <p className="text-navy-400 leading-relaxed mb-6">
                All prospective cadets must meet our enrolment requirements and pass a comprehensive medical examination conducted by an approved maritime medical examiner.
              </p>

              <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FiShield className="text-blue-400" /> Medical Standards
                </h3>
                <ul className="space-y-3">
                  {medicalStandards.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-navy-400 text-sm">
                      <FiCheckCircle className="text-green-400 flex-shrink-0" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact" className="btn-primary">
                Start Enrolment Process <FiArrowRight />
              </Link>
            </div>

            <div>
              <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FiBook className="text-blue-400" /> Enrolment Requirements
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Academic', items: ['Minimum GCE A/L qualification (Science preferred)', 'Mathematics & Physics for Engineering track', 'English proficiency required'] },
                    { label: 'Age Criteria', items: ['Officer Cadetship: 17–25 years', 'Marine Engineering: 17–25 years', 'Short courses: 18+ years'] },
                    { label: 'Documents', items: ['Certified copies of educational certificates', 'Birth certificate', 'National ID or passport', 'Medical fitness certificate'] },
                  ].map((section, i) => (
                    <div key={i}>
                      <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">{section.label}</p>
                      <ul className="space-y-1.5">
                        {section.items.map((item, j) => (
                          <li key={j} className="text-navy-400 text-sm flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-navy-500 flex-shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5">
                <p className="text-blue-400 font-semibold text-sm mb-1">🎯 Guaranteed Placement</p>
                <p className="text-navy-400 text-sm">All graduating cadets are guaranteed placement through our network of 150+ international shipping company partners.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE OF THE ART TRAINING */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600"
            alt="Training"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-navy-950/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge-blue mb-4 mx-auto">Infrastructure</div>
          <h2 className="section-title mb-4">State of the Art Training Enablers</h2>
          <p className="text-navy-400 max-w-2xl mx-auto mb-12">
            Our training facilities match — and in many cases exceed — the standards required for real-world maritime operations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Full-Mission Simulator', desc: '360° bridge navigation simulation' },
              { icon: '⚙️', title: 'Engine Room Sim', desc: 'Realistic propulsion training' },
              { icon: '📡', title: 'GMDSS Lab', desc: 'Advanced communications training' },
              { icon: '🔥', title: 'Fire Training', desc: 'Real-fire STCW certification' },
            ].map((item, i) => (
              <div key={i} className="bg-navy-900 border border-navy-700 rounded-2xl p-6 hover:border-blue-500/40 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-navy-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Chart Your Global Maritime Career?"
        subtitle="Your journey to becoming a world-class maritime professional starts here."
        primaryLabel="Apply Now"
        primaryTo="/contact"
        secondaryLabel="Contact Admissions"
        secondaryTo="/contact"
      />
    </div>
  )
}
