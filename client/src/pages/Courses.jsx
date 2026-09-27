import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiClock, FiArrowRight, FiCheckCircle, FiStar, FiGlobe, FiShield, FiBook, FiAnchor, FiAward } from 'react-icons/fi'
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
    title: 'Officer & Rating Training',
    desc: 'Officer Cadet (Nautical Science / Pre-Sea) nautical science training for merchant navy officers.',
    duration: '24 Months',
    category: 'Deck Department',
    image: '/course-officer.jpg',
  },
  {
    icon: '⚙️',
    title: 'Marine Engineering Cadetship',
    desc: 'Class IV Marine Engineer Officer CoC Track focusing on engine propulsion and ship mechanics.',
    duration: '36 Months',
    category: 'Engine Propulsion',
    image: '/course-engineering.jpg',
  },
  {
    icon: '🚤',
    title: 'Pre-Sea General Purpose Rating',
    desc: 'Seamanship, Firefighting & Lifeboat Proficiency certification for general purpose ratings.',
    duration: '9 Months',
    category: 'Pre-Sea General',
    image: '/course-rating.jpg',
  },
  {
    icon: '🖥️',
    title: 'ECDIS & Simulator Lab',
    desc: 'IMO STCW Modular & Mandatory Competencies electronic navigation and bridge simulation.',
    duration: 'Fast Track',
    category: 'STCW Modular',
    image: '/course-ecdis.jpg',
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

const officerCadetPrograms = [
  {
    title: 'Navigation Officer Cadet',
    overview: "The life of a navigation officer cadet or deck cadet is adventurous and rewarding. When in charge of the navigational watch one must undertake responsibilities while also being a trustworthy individual. It is undoubtedly the ideal learning experience in seafaring and marine engineering in Sri Lanka, which is an essential step in a cadet's journey towards becoming a Ship's Captain.\n\nIn addition to the prospect of adventure at sea, a navigation officer cadet will receive an attractive tax-free remuneration in US dollars. As work is assigned on a contractual basis, cadets taking seaman courses can also maintain a healthy work-life balance while planning a productive retirement.",
    journey: [
      'Phase I — Residential, shore-based training (6 months)',
      'Phase II — On-board training (12 months)',
      'Phase III — Preparatory course for Officer in Charge of a Navigational Watch, Class III (6 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the relevant Technology-stream "S" pass combinations specified by DGMS',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome: 'On completing the programme and the ministry exam, cadets qualify to sail as Third Officer on foreign-going ships.',
    careerSea: 'Third Officer → Second Officer → Chief Officer → Captain',
    careerAshore: 'Harbour Pilot, Marine Superintendent, Shipping Administrator, Port State Controller, Harbour Master, Crew Manager, Maritime Educator'
  },
  {
    title: 'Engineering Officer Cadet',
    overview: "A trained marine engineering officer must ensure the smooth operation of the ship's propulsion plants and support systems during the entire seafaring process. Experiencing career growth, an engineering officer is also offered excellent tax-free remuneration at an early stage of the career. As in the case of a navigation officer, an engineering officer will also work on a contract basis which makes it easier to plan work and family life.",
    journey: [
      'Phase I — Residential, shore-based training at the Institute (12 months)',
      'Phase II — Industrial training (9 months)',
      'Phase III — Onboard training (12 months)',
      'Phase IV — Preparatory course for Officer in Charge of an Engineering Watch, Class III (4 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the equivalent Technology-stream "S" pass combinations',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome: 'On completing the programme and the ministry exam, cadets receive a Class III certificate of competency, qualifying them to serve as Third or Fourth Engineer on a foreign-going ship.',
    careerSea: 'Fourth Engineer → Third Engineer → Second Engineer → Chief Engineer',
    careerAshore: 'Maintenance Engineer (star-class hotels), Ships & Industrial Surveyor, Technical Superintendent, Maritime Educator, Ship Repairs/Construction'
  }
]

const ratingPrograms = [
  {
    title: 'Deck Rating',
    overview: 'Working on the deck while seafaring requires continuous vigilance. Ensuring the protection of the cargo, and carrying out navigational, security and maintenance work are also areas that will be perfected at the end of the best rating training course in Sri Lanka.',
    requirements: '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath: 'Ordinary Seaman at sea, progressing with experience and qualification toward Captain.',
  },
  {
    title: 'Engine Rating',
    overview: 'Upon completion of this course, participants will gain the ability to single-handedly and collectively manage maintenance work in the engine room and on board a ship while seafaring... and assist the marine engineers.',
    requirements: '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath: 'Engine Rating, with the potential to progress toward Chief Engineer with training and dedication.',
  },
  {
    title: 'Electro-Technical Rating (ETR)',
    overview: 'The Electro-Technical Rating Programme equips candidates with the technical knowledge and hands-on skills required to serve as Electro-Technical Ratings aboard modern merchant vessels, meeting current STCW requirements for electrical, electronic, instrumentation and control systems.',
    requirements: 'GCE O/L passes; minimum age 18; medical fitness and eyesight (including colour vision) per STCW; interview if required.',
    careerPath: 'Trainee Electro-Technical Rating → Electrical/Instrumentation Maintenance Technician, ship-repair or marine power-generation roles → with experience, advancement toward Electro-Technical Officer.',
  },
  {
    title: 'Catering Rating',
    overview: 'Specialized training for those interested in joining the maritime hospitality sector. Practical training is offered at a partner star-class hotel.',
    requirements: 'GCE O/L passes; minimum age 18; demonstrated medical fitness.',
    careerPath: 'Catering Rating Programme → theory and practical training at a star-class hotel → Cook.',
  }
]

const shortCourses = {
  stcw: [
    'AFF — Proficiency in Advanced Fire Fighting',
    'Refreshing & Updating for Advanced Fire Fighting (AFF)',
    'EFA — Proficiency in Elementary First Aid',
    'FPFF — Proficiency in Fire Prevention & Fire Fighting',
    'MFA — Proficiency in Medical First Aid',
    'Refreshing & Updating for Medical First Aid (MFA)',
    'PSCRB — Proficiency in Survival Craft & Rescue Boats other than Fast Rescue Boats',
    'Refreshing & Updating for PSCRB',
    'PSSR — Proficiency in Personal Safety & Social Responsibilities',
    'PST — Proficiency in Personal Survival Techniques',
    'Refresher & Updating for Fire Prevention & Fire-Fighting',
    'Revalidation Course for Deck Officers of Ships of 500GT or More — Operational Level',
    'SDSD — Proficiency in Security Training for Seafarers with Designated Security Duties'
  ],
  nonStcw: [
    'Crowd Management',
    'Certificate of Proficiency Deck/Engine (COP)',
    'Preparatory Course for Able Seafarer – Deck (COP Deck)',
    'Preparatory Course for Able Seafarer – Engine (COP Engine)',
    'Basic Short Courses (BST: Fire Prevention, PST, PSSR, EFA)',
    'Advanced Short Courses (Advanced Fire Fighting, Medical First Aid, PSCRB, Ship Security Officer)',
    'Refreshing & Updating Basic Courses',
    'Refresher & Updating Advanced Courses',
    'ROP — Radar Observation and Plotting',
    'SSO — Proficiency as Ship Security Officer',
    'SSA — Proficiency in Ship Security Awareness',
    'Passenger Ship Crisis Management & Human Behaviour'
  ],
  simulator: [
    'MEOL — Maritime English Language Course, Operational Level',
    'MESL — Maritime English Language Course, Support Level',
    'Engine Room Simulator, Operational Level',
    'ARPA — Automatic Radar Plotting Aids',
    'ECDIS — Electronic Chart Display & Information System',
    'ENS — Electronic Navigation Systems',
    'NWKS — Navigation Watch Keeping Simulator, Operational Level',
    'ROP — Radar Observation & Plotting',
    'RS — Radar Simulator',
    'ECDIS Type-Specific — Safe Bridge',
    'ECDIS Type-Specific — Furuno'
  ],
  customized: [
    'COLREGS',
    'HAZMAT',
    'Heavy Lift Operation Training Course',
    'VHF Communication',
    'AIDA Orientation (AIDA Cruises)',
    'Chart Symbols & Abbreviation',
    'Elementary Trauma Care',
    'IALA Maritime Buoyage System',
    'Introduction to Fire Safety & Survival at Sea',
    'Safety Awareness Course (Swire Shipping)'
  ]
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  
  // New state variables for detailed tabs
  const [activeTab, setActiveTab] = useState('officer')
  const [activeShortCourseTab, setActiveShortCourseTab] = useState('stcw')

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

      {/* STRUCTURED DISCIPLINES (Original Component) */}
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

      {/* NEW DETAILED TRAINING PROGRAMMES (Added from PDF) */}
      <section className="py-20 bg-navy-900 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="badge-blue mb-3 mx-auto">Comprehensive Guide</div>
            <h2 className="section-title">Detailed Training Programmes</h2>
            <p className="text-navy-400 mt-2 max-w-xl mx-auto">
              In-depth information on our Officer Cadet, Rating Training, and Short Courses.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar mb-8 justify-center border-b border-navy-800">
            <button
              onClick={() => setActiveTab('officer')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'officer' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Officer Cadet Programs
            </button>
            <button
              onClick={() => setActiveTab('rating')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'rating' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Rating Training Programs
            </button>
            <button
              onClick={() => setActiveTab('short')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'short' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Short Courses
            </button>
          </div>

          {/* OFFICER CADET PROGRAMS */}
          {activeTab === 'officer' && (
            <div className="space-y-16">
              {officerCadetPrograms.map((program, idx) => (
                <div key={idx} className="bg-navy-950 border border-navy-800 rounded-2xl p-6 md:p-10 shadow-xl">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <FiAnchor className="text-blue-500" /> {program.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {program.overview.split('\n\n').map((para, i) => (
                      <p key={i} className="text-navy-300 leading-relaxed mb-4">{para}</p>
                    ))}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiClock className="text-blue-400" /> Your Journey
                      </h3>
                      <ul className="space-y-3">
                        {program.journey.map((phase, i) => (
                          <li key={i} className="flex items-start gap-3 text-navy-300 text-sm bg-navy-800/50 p-3 rounded-lg border border-navy-700/50">
                            <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">{i+1}</span>
                            <span className="mt-0.5">{phase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiCheckCircle className="text-green-400" /> Entry Requirements
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {program.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-navy-300 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-xl">
                        <h4 className="text-blue-400 font-bold text-sm mb-2">Outcome</h4>
                        <p className="text-navy-300 text-sm mb-4">{program.outcome}</p>
                        
                        <h4 className="text-blue-400 font-bold text-sm mb-1">Career Paths at Sea</h4>
                        <p className="text-navy-300 text-sm mb-4">{program.careerSea}</p>
                        
                        <h4 className="text-blue-400 font-bold text-sm mb-1">Career Paths Ashore</h4>
                        <p className="text-navy-300 text-sm">{program.careerAshore}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RATING TRAINING PROGRAMS */}
          {activeTab === 'rating' && (
            <div className="grid md:grid-cols-2 gap-8">
              {ratingPrograms.map((program, idx) => (
                <div key={idx} className="bg-navy-950 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 text-blue-400">{program.title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed mb-6">{program.overview}</p>
                  
                  <div className="mt-auto space-y-6">
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                        <FiCheckCircle className="text-green-400" /> Entry Standards
                      </h4>
                      <p className="text-navy-400 text-sm bg-navy-800/50 p-3 rounded border border-navy-700/50">{program.requirements}</p>
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                        <FiAward className="text-amber-400" /> Career Path
                      </h4>
                      <p className="text-navy-400 text-sm bg-navy-800/50 p-3 rounded border border-navy-700/50">{program.careerPath}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SHORT COURSES */}
          {activeTab === 'short' && (
            <div className="bg-navy-950 border border-navy-800 rounded-2xl p-6 md:p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-8">Short Courses Catalogue</h2>
              
              <div className="flex flex-wrap gap-2 mb-8 border-b border-navy-800 pb-4">
                {[
                  { id: 'stcw', label: 'STCW Courses' },
                  { id: 'nonStcw', label: 'Non-STCW Courses' },
                  { id: 'simulator', label: 'Simulator Training' },
                  { id: 'customized', label: 'Customized Training' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveShortCourseTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeShortCourseTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-navy-800 text-navy-300 hover:text-white hover:bg-navy-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {shortCourses[activeShortCourseTab].map((course, idx) => (
                  <div key={idx} className="bg-navy-800/50 border border-navy-700/50 rounded-xl p-4 flex items-start gap-3">
                    <FiBook className="text-blue-500 mt-1 shrink-0" />
                    <span className="text-navy-200 text-sm">{course}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-400/90 text-sm flex items-start gap-2">
                  <FiShield className="mt-1 shrink-0" />
                  Note: To register or inquire about course schedules and fees for any of the short courses listed above, please contact our admissions desk.
                </p>
                <Link to="/contact" className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-4 py-2 rounded text-sm transition-colors">
                  Contact Admissions
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PATHWAY TO COMMAND (Original Component) */}
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

      {/* GLOBALLY CERTIFIED (Original Component) */}
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

      {/* CADET ENROLLMENT & MEDICAL (Original Component) */}
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

      {/* STATE OF THE ART TRAINING (Original Component) */}
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
