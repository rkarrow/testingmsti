import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiClock, FiArrowRight, FiCheckCircle, FiStar, FiGlobe, FiShield, FiBook, FiAnchor, FiAward, FiX, FiCompass } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import CTASection from '../components/CTASection'
import { defaultStcwCourses } from '../data/defaultStcwCourses'
import { defaultCadetStandards, defaultRatingStandards } from '../data/defaultStandards'


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
  { step: '06', title: 'Global Placement', desc: 'Join our partner fleet of 50+ international shipping companies with guaranteed placement.', duration: 'Ongoing' },
]

const medicalStandards = [
  'Vision: Minimum 6/6 corrected or uncorrected',
  'Color vision: No red/green color blindness',
  'Hearing: Adequate for bridge communication',
  'Cardiovascular: No significant cardiac conditions',
  'BMI within acceptable maritime health range',
  'No disqualifying chronic medical conditions',
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

function StandardsSection({ data, isRating }) {
  if (!data) return null
  const medicalList = Array.isArray(data.medicalItems)
    ? data.medicalItems
    : typeof data.medicalItems === 'string'
    ? data.medicalItems.split('\n').filter(Boolean)
    : []

  const academicList = Array.isArray(data.academicRequirements)
    ? data.academicRequirements
    : typeof data.academicRequirements === 'string'
    ? data.academicRequirements.split('\n').filter(Boolean)
    : []

  const ageList = Array.isArray(data.ageRequirements)
    ? data.ageRequirements
    : typeof data.ageRequirements === 'string'
    ? data.ageRequirements.split('\n').filter(Boolean)
    : []

  const docList = Array.isArray(data.documentRequirements)
    ? data.documentRequirements
    : typeof data.documentRequirements === 'string'
    ? data.documentRequirements.split('\n').filter(Boolean)
    : []

  return (
    <section className={`py-20 ${isRating ? 'bg-navy-950 border-t border-navy-800' : 'bg-navy-900/40 border-t border-navy-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="badge-blue mb-4">{data.badge || (isRating ? 'Rating Admissions' : 'Admissions')}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{data.title}</h2>
            <p className="text-navy-400 leading-relaxed mb-6">
              {data.description}
            </p>

            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FiShield className="text-blue-400" /> {data.medicalTitle || 'Medical Standards'}
              </h3>
              <ul className="space-y-3">
                {medicalList.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-navy-400 text-sm">
                    <FiCheckCircle className="text-green-400 flex-shrink-0" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={data.ctaLink || '/contact'} className="btn-primary">
              {data.ctaText || (isRating ? 'Apply for Rating Training' : 'Start Enrolment Process')} <FiArrowRight />
            </Link>
          </div>

          <div>
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FiBook className="text-blue-400" /> {data.enrolmentTitle || 'Enrolment Requirements'}
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Academic', items: academicList },
                  { label: 'Age Criteria', items: ageList },
                  { label: 'Documents', items: docList },
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
              <p className="text-blue-400 font-semibold text-sm mb-1">{data.placementTitle || '🎯 Guaranteed Placement'}</p>
              <p className="text-navy-400 text-sm">{data.placementText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Main Courses')
  
  // STCW Courses from settings or default
  const [stcwData, setStcwData] = useState(defaultStcwCourses)
  const [selectedStcwSubCat, setSelectedStcwSubCat] = useState('all')
  const [selectedStcwModal, setSelectedStcwModal] = useState(null)

  // Enrolment & Medical Standards from settings
  const [cadetStandards, setCadetStandards] = useState(defaultCadetStandards)
  const [ratingStandards, setRatingStandards] = useState(defaultRatingStandards)

  // Dynamic programmes from settings
  const [officerList, setOfficerList] = useState(officerCadetPrograms)
  const [ratingList, setRatingList] = useState(ratingPrograms)
  const [shortCoursesList, setShortCoursesList] = useState(shortCourses)

  const [activeTab, setActiveTab] = useState('officer')
  const [activeShortCourseTab, setActiveShortCourseTab] = useState('stcw')

  const categories = ['Main Courses', 'STCW Courses']

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [res, setRes] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/settings')
        ])
        if (res.data?.data) {
          setCourses(res.data.data)
        }
        if (setRes.data?.data) {
          const s = setRes.data.data
          if (s.stcwData && Array.isArray(s.stcwData) && s.stcwData.length > 0) {
            setStcwData(s.stcwData)
          }
          if (s.cadetStandards) {
            setCadetStandards(s.cadetStandards)
          }
          if (s.ratingStandards) {
            setRatingStandards(s.ratingStandards)
          }
          if (s.officerCadetPrograms && s.officerCadetPrograms.length > 0) {
            setOfficerList(s.officerCadetPrograms)
          }
          if (s.ratingPrograms && s.ratingPrograms.length > 0) {
            setRatingList(s.ratingPrograms)
          }
          if (s.shortCourses && Object.keys(s.shortCourses).length > 0) {
            setShortCoursesList((prev) => ({ ...prev, ...s.shortCourses }))
          }
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const displayCourses = courses.length > 0
    ? (activeCategory === 'Main Courses' || activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory))
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
    <div className="pt-[96px]">
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
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-blue-600/30'
                    : 'bg-navy-800 text-navy-300 hover:text-white hover:bg-navy-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory === 'Main Courses' && (
            loading ? (
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
            )
          )}

          {activeCategory === 'STCW Courses' && (
            <div className="space-y-10">
              {/* Sub-Category Filter Pills */}
              <div className="flex flex-wrap gap-2 justify-center border-b border-navy-800 pb-6">
                <button
                  onClick={() => setSelectedStcwSubCat('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedStcwSubCat === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-navy-900 text-navy-400 hover:text-white hover:bg-navy-800 border border-navy-800'
                  }`}
                >
                  All Categories ({stcwData[0]?.children?.reduce((acc, c) => acc + (c.items?.length || 0), 0) || 0})
                </button>
                {stcwData[0]?.children?.map((subCat) => (
                  <button
                    key={subCat.category_id}
                    onClick={() => setSelectedStcwSubCat(subCat.category_id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedStcwSubCat === subCat.category_id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-navy-900 text-navy-400 hover:text-white hover:bg-navy-800 border border-navy-800'
                    }`}
                  >
                    <span>{subCat.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-navy-800/80 text-navy-300">
                      {subCat.items?.length || 0}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sub-Category Groups */}
              <div className="space-y-10">
                {stcwData[0]?.children
                  ?.filter((subCat) => selectedStcwSubCat === 'all' || selectedStcwSubCat === subCat.category_id)
                  .map((subCat) => (
                    <div key={subCat.category_id} className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            {subCat.title}
                          </h3>
                          <p className="text-xs text-navy-400 mt-1">
                            Approved maritime competencies under international IMO STCW standards.
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-800 text-blue-400 border border-navy-700 w-fit">
                          {subCat.items?.length || 0} Course{subCat.items?.length === 1 ? '' : 's'} Available
                        </span>
                      </div>

                      {subCat.items && subCat.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {subCat.items.map((item, itemIdx) => (
                            <div
                              key={item.id || itemIdx}
                              onClick={() => setSelectedStcwModal({ ...item, categoryTitle: subCat.title })}
                              className="bg-navy-950 border border-navy-800 hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-blue-500/10 relative cursor-pointer"
                            >
                              {/* Course Photo */}
                              <div className="relative w-full h-44 bg-navy-900 overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 text-navy-500 p-4 text-center">
                                    <FiAnchor className="text-3xl text-blue-500/40 mb-1" />
                                    <span className="text-xs font-semibold text-navy-400">STCW Maritime Training</span>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-black/30" />

                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                                    {item.code}
                                  </span>
                                  {item.id && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-navy-900/80 text-navy-300 backdrop-blur-sm border border-navy-700">
                                      #{item.id}
                                    </span>
                                  )}
                                </div>

                                {item.duration && (
                                  <div className="absolute top-3 right-3">
                                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-navy-900/90 text-amber-400 border border-amber-400/30 backdrop-blur-sm flex items-center gap-1">
                                      <FiClock size={11} /> {item.duration}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Card Body */}
                              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                  <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">
                                    {subCat.title}
                                  </span>
                                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                                    {item.name}
                                  </h4>
                                  {item.description && (
                                    <p className="text-xs text-navy-300 line-clamp-2 leading-relaxed">
                                      {item.description}
                                    </p>
                                  )}
                                </div>

                                <div className="pt-3 border-t border-navy-850 flex items-center justify-between">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedStcwModal({ ...item, categoryTitle: subCat.title })
                                    }}
                                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group/btn cursor-pointer"
                                  >
                                    View Details <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
                                  </button>

                                  <Link
                                    to={`/contact?course=${encodeURIComponent(item.name + ' (' + item.code + ')')}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs font-semibold bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all cursor-pointer"
                                  >
                                    Inquire
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center bg-navy-950/60 rounded-xl border border-navy-800/80 space-y-3">
                          <FiAnchor className="mx-auto text-navy-600 text-3xl" />
                          <p className="text-sm text-navy-400 font-medium">
                            No active batches currently scheduled for {subCat.title}.
                          </p>
                          <Link
                            to="/contact"
                            className="inline-block text-xs font-semibold bg-navy-800 hover:bg-navy-750 text-blue-400 border border-navy-700 px-4 py-2 rounded-lg transition-colors"
                          >
                            Inquire for Upcoming Intakes →
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>


      {/* 1. CADET ENROLMENT & MEDICAL STANDARDS */}
      <StandardsSection data={cadetStandards} isRating={false} />

      {/* 2. RATING ENROLMENT & MEDICAL STANDARDS */}
      <StandardsSection data={ratingStandards} isRating={true} />


      {/* CTA */}
      <CTASection
        title="Ready to Chart Your Global Maritime Career?"
        subtitle="Your journey to becoming a world-class maritime professional starts here."
        primaryLabel="Apply Now"
        primaryTo="/contact"
        secondaryLabel="Contact Admissions"
        secondaryTo="/contact"
      />

      {/* STCW COURSE DETAILS MODAL */}
      {selectedStcwModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedStcwModal(null)}
        >
          <div
            className="bg-navy-900 border border-navy-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-56 sm:h-64 bg-navy-950 shrink-0">
              {selectedStcwModal.image ? (
                <img
                  src={selectedStcwModal.image}
                  alt={selectedStcwModal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 text-navy-400">
                  <FiAnchor className="text-5xl text-blue-500/50 mb-2" />
                  <span className="text-sm font-semibold">STCW Maritime Training Programme</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-black/60" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedStcwModal(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <FiX size={18} />
              </button>

              {/* Badges on Hero */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-sm font-mono font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/40">
                    {selectedStcwModal.code}
                  </span>
                  {selectedStcwModal.id && (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-mono bg-navy-950/80 text-navy-300 border border-navy-700 backdrop-blur-sm">
                      #{selectedStcwModal.id}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                    STCW Approved
                  </span>
                </div>

                {selectedStcwModal.duration && (
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm flex items-center gap-1.5">
                    <FiClock size={13} /> {selectedStcwModal.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  {selectedStcwModal.categoryTitle || 'STCW Course'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedStcwModal.name}
                </h3>
              </div>

              {/* Description / Overview */}
              {selectedStcwModal.description && (
                <div className="bg-navy-950/70 border border-navy-800 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs font-bold text-navy-300 uppercase tracking-wider flex items-center gap-2">
                    <FiBook className="text-blue-400" /> Course Overview & Competencies
                  </h4>
                  <p className="text-sm text-navy-200 leading-relaxed whitespace-pre-line">
                    {selectedStcwModal.description}
                  </p>
                </div>
              )}

              {/* Requirements & Certification Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Requirements */}
                <div className="bg-navy-950/70 border border-navy-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-navy-300 uppercase tracking-wider flex items-center gap-2">
                    <FiShield className="text-amber-400" /> Entry Requirements
                  </h4>
                  {selectedStcwModal.requirements ? (
                    <ul className="text-xs text-navy-200 space-y-2">
                      {(typeof selectedStcwModal.requirements === 'string'
                        ? selectedStcwModal.requirements.split('\n').filter(Boolean)
                        : Array.isArray(selectedStcwModal.requirements)
                        ? selectedStcwModal.requirements
                        : []
                      ).map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-navy-400">
                      Standard maritime medical fitness certificate and identification documentation.
                    </p>
                  )}
                </div>

                {/* Outcomes */}
                <div className="bg-navy-950/70 border border-navy-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-navy-300 uppercase tracking-wider flex items-center gap-2">
                    <FiAward className="text-emerald-400" /> Certification Awarded
                  </h4>
                  {selectedStcwModal.outcomes ? (
                    <ul className="text-xs text-navy-200 space-y-2">
                      {(typeof selectedStcwModal.outcomes === 'string'
                        ? selectedStcwModal.outcomes.split('\n').filter(Boolean)
                        : Array.isArray(selectedStcwModal.outcomes)
                        ? selectedStcwModal.outcomes
                        : []
                      ).map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={13} />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-navy-400">
                      IMO STCW Certificate of Proficiency approved by Merchant Shipping Secretariat / DGMS.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-navy-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedStcwModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to={`/contact?course=${encodeURIComponent(selectedStcwModal.name + ' (' + selectedStcwModal.code + ')')}`}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Inquire / Enroll Now <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
