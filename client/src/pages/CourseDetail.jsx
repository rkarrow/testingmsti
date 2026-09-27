import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FiClock,
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCompass,
  FiAnchor,
  FiShield,
  FiSend,
  FiBookOpen,
} from 'react-icons/fi'

const defaultOfficerCadetPrograms = [
  {
    _id: 'nav-officer-cadet',
    title: 'Navigation Officer Cadet',
    category: 'Deck Department',
    duration: '24 Months',
    level: 'Degree / Class III CoC',
    intake: 'January & July',
    image: '/course-officer.jpg',
    overview:
      "The life of a navigation officer cadet or deck cadet is adventurous and rewarding. When in charge of the navigational watch one must undertake responsibilities while also being a trustworthy individual. It is undoubtedly the ideal learning experience in seafaring and marine engineering in Sri Lanka, which is an essential step in a cadet's journey towards becoming a Ship's Captain.\n\nIn addition to the prospect of adventure at sea, a navigation officer cadet will receive an attractive tax-free remuneration in US dollars. As work is assigned on a contractual basis, cadets taking seaman courses can also maintain a healthy work-life balance while planning a productive retirement.",
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
    outcome:
      'On completing the programme and the ministry exam, cadets qualify to sail as Third Officer on foreign-going ships.',
    careerSea: 'Third Officer → Second Officer → Chief Officer → Captain',
    careerAshore:
      'Harbour Pilot, Marine Superintendent, Shipping Administrator, Port State Controller, Harbour Master, Crew Manager, Maritime Educator',
  },
  {
    _id: 'eng-officer-cadet',
    title: 'Engineering Officer Cadet',
    category: 'Engine Propulsion',
    duration: '36 Months',
    level: 'Degree / Class III CoC',
    intake: 'January & July',
    image: '/course-engineering.jpg',
    overview:
      "A trained marine engineering officer must ensure the smooth operation of the ship's propulsion plants and support systems during the entire seafaring process. Experiencing career growth, an engineering officer is also offered excellent tax-free remuneration at an early stage of the career. As in the case of a navigation officer, an engineering officer will also work on a contract basis which makes it easier to plan work and family life.",
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
    outcome:
      'On completing the programme and the ministry exam, cadets receive a Class III certificate of competency, qualifying them to serve as Third or Fourth Engineer on a foreign-going ship.',
    careerSea: 'Fourth Engineer → Third Engineer → Second Engineer → Chief Engineer',
    careerAshore:
      'Maintenance Engineer (star-class hotels), Ships & Industrial Surveyor, Technical Superintendent, Maritime Educator, Ship Repairs/Construction',
  },
]

const defaultRatingPrograms = [
  {
    _id: 'deck-rating',
    title: 'Deck Rating',
    category: 'Pre-Sea General',
    duration: '9 Months',
    level: 'Certificate of Proficiency',
    intake: 'March & September',
    image: '/course-rating.jpg',
    overview:
      'Working on the deck while seafaring requires continuous vigilance. Ensuring the protection of the cargo, and carrying out navigational, security and maintenance work are also areas that will be perfected at the end of the best rating training course in Sri Lanka.',
    requirements: [
      '6 "S" passes at GCE O/L including Science, Maths & English',
      'Age 18+ at recruitment',
      'Demonstrated physical and medical fitness',
    ],
    outcome:
      'Qualify as Ordinary Seaman with Certificate of Proficiency in Watch-Keeping (Deck).',
    careerSea: 'Ordinary Seaman → Able Seaman → Bosun → Third Officer (with requisite sea time and exam) → Captain',
    careerPath: 'Ordinary Seaman at sea, progressing with experience and qualification toward Captain.',
  },
  {
    _id: 'engine-rating',
    title: 'Engine Rating',
    category: 'Engine Support',
    duration: '9 Months',
    level: 'Certificate of Proficiency',
    intake: 'March & September',
    image: '/course-engineering.jpg',
    overview:
      'Upon completion of this course, participants will gain the ability to single-handedly and collectively manage maintenance work in the engine room and on board a ship while seafaring and assist the marine engineers.',
    requirements: [
      '6 "S" passes at GCE O/L including Science, Maths & English',
      'Age 18+ at recruitment',
      'Demonstrated physical and medical fitness',
    ],
    outcome:
      'Qualify as Engine Rating with Certificate of Proficiency in Engine Watch-Keeping.',
    careerSea: 'Engine Wiper / Motorman → Able Seafarer Engine → Fourth Engineer (NCV) → Chief Engineer',
    careerPath: 'Engine Rating, with the potential to progress toward Chief Engineer with training and dedication.',
  },
  {
    _id: 'etr-rating',
    title: 'Electro-Technical Rating (ETR)',
    category: 'Electrical & Automation',
    duration: '6 Months',
    level: 'Certificate of Competency',
    intake: 'Quarterly',
    image: '/course-ecdis.jpg',
    overview:
      'The Electro-Technical Rating Programme equips candidates with the technical knowledge and hands-on skills required to serve as Electro-Technical Ratings aboard modern merchant vessels, meeting current STCW requirements for electrical, electronic, instrumentation and control systems.',
    requirements: [
      'GCE O/L passes including Science and Mathematics',
      'Minimum age 18',
      'Medical fitness and eyesight (including colour vision) per STCW',
    ],
    outcome:
      'Qualify for electrical, electronic, instrumentation and control support roles aboard commercial vessels.',
    careerSea: 'Trainee ETR → Electro-Technical Rating → Electro-Technical Officer (ETO)',
    careerAshore: 'Electrical/Instrumentation Maintenance Technician, Ship Repair & Marine Power Facilities',
  },
  {
    _id: 'catering-rating',
    title: 'Catering Rating',
    category: 'Maritime Hospitality',
    duration: '6 Months',
    level: 'Certificate of Proficiency',
    intake: 'Bi-Annual',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    overview:
      'Specialized training for those interested in joining the maritime hospitality sector. Practical training is offered in collaboration with partner star-class hotel facilities.',
    requirements: [
      'GCE O/L passes',
      'Minimum age 18',
      'Demonstrated medical fitness and food handler certification standard',
    ],
    outcome:
      'Qualify as Ship Cook / Steward on international merchant and cruise vessels.',
    careerSea: 'Assistant Steward / Cook → Chief Cook → Catering Officer',
    careerAshore: 'Hospitality Management in 5-Star Hotels and Resorts',
  },
]

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true)
      try {
        // 1. Try to fetch from backend Courses API if it's mongo ObjectId
        if (id && id.length === 24) {
          try {
            const res = await axios.get(`/api/courses/${id}`)
            if (res.data?.success && res.data.data) {
              setCourse(res.data.data)
              setLoading(false)
              return
            }
          } catch (e) {
            // continue fallback
          }
        }

        // 2. Fetch settings to check dynamic officer / rating programs
        const setRes = await axios.get('/api/settings')
        const dynOfficer = setRes.data?.data?.officerCadetPrograms || defaultOfficerCadetPrograms
        const dynRating = setRes.data?.data?.ratingPrograms || defaultRatingPrograms

        // Match by id or title slug
        const matchedOfficer = dynOfficer.find(
          (p, i) =>
            p._id === id ||
            p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id?.toLowerCase() ||
            String(i) === id
        )
        if (matchedOfficer) {
          setCourse(matchedOfficer)
          setLoading(false)
          return
        }

        const matchedRating = dynRating.find(
          (p, i) =>
            p._id === id ||
            p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id?.toLowerCase() ||
            String(i) === id
        )
        if (matchedRating) {
          setCourse(matchedRating)
          setLoading(false)
          return
        }

        // 3. Check general courses list from API
        try {
          const generalRes = await axios.get('/api/courses')
          const found = (generalRes.data?.data || []).find(
            (c) =>
              c._id === id ||
              String(c._id) === id ||
              c.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id?.toLowerCase()
          )
          if (found) {
            setCourse(found)
            setLoading(false)
            return
          }
        } catch (e) {}

        // 4. Check default lists
        const allDefaults = [...defaultOfficerCadetPrograms, ...defaultRatingPrograms]
        const fallback = allDefaults.find(
          (d) =>
            d._id === id ||
            d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id?.toLowerCase()
        )
        setCourse(fallback || null)
      } catch (err) {
        console.error('Error fetching course detail:', err)
        const allDefaults = [...defaultOfficerCadetPrograms, ...defaultRatingPrograms]
        const fallback = allDefaults.find(
          (d) =>
            d._id === id ||
            d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id?.toLowerCase()
        )
        setCourse(fallback || null)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 bg-navy-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-navy-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-400 font-medium">Loading Course Details...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-navy-950 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center text-3xl mb-6">
          ⚓
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Programme Not Found</h1>
        <p className="text-navy-400 max-w-md mb-8">
          The maritime training programme you are looking for might have been moved or updated.
        </p>
        <Link to="/courses" className="btn-primary">
          <FiArrowLeft /> Back to All Programmes
        </Link>
      </div>
    )
  }

  const reqList = Array.isArray(course.requirements)
    ? course.requirements
    : typeof course.requirements === 'string'
    ? course.requirements.split('\n').filter(Boolean)
    : []

  const journeyList = Array.isArray(course.journey)
    ? course.journey
    : typeof course.journey === 'string'
    ? course.journey.split('\n').filter(Boolean)
    : []

  return (
    <div className="pt-20 sm:pt-28 bg-navy-950 min-h-screen pb-24">
      {/* BREADCRUMB & TOP HERO */}
      <section className="relative bg-navy-900/60 border-b border-navy-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-navy-400 mb-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-blue-400 transition-colors">
              Programmes
            </Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs sm:max-w-md">{course.title}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                <FiCompass /> {course.category || 'Maritime Discipline'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-navy-300 text-base md:text-lg leading-relaxed max-w-2xl">
                {course.shortDescription ||
                  (typeof course.overview === 'string'
                    ? course.overview.split('\n')[0]
                    : course.description)}
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="lg:col-span-4 bg-navy-950/80 border border-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <span className="text-xs text-navy-400">Duration</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FiClock className="text-blue-400" /> {course.duration || 'Standard'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <span className="text-xs text-navy-400">Certification / Level</span>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <FiAward className="text-amber-400" /> {course.level || 'STCW Class III / Certificate'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy-400">Intake Periods</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <FiCalendar className="text-emerald-400" /> {course.intake || 'January & July'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: DETAILED INFO */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image if available */}
            {course.image && (
              <div className="rounded-2xl overflow-hidden border border-navy-800 max-h-96 shadow-2xl bg-navy-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/hero-image.jpg'
                  }}
                />
              </div>
            )}

            {/* Programme Overview */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
                <FiBookOpen className="text-blue-400" /> Programme Overview
              </h2>
              <div className="text-navy-300 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {course.overview || course.description || 'Comprehensive training designed in compliance with international maritime standards.'}
              </div>
            </div>

            {/* Training Journey / Curriculum Phases (if present) */}
            {journeyList.length > 0 && (
              <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
                  <FiCompass className="text-blue-400" /> Training Pathway & Journey Phases
                </h2>
                <div className="space-y-3">
                  {journeyList.map((phase, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl bg-navy-950 border border-navy-800 hover:border-blue-500/40 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm md:text-base text-navy-200 mt-1">{phase}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Entry Requirements */}
            {reqList.length > 0 && (
              <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
                  <FiCheckCircle className="text-emerald-400" /> Entry Requirements & Standards
                </h2>
                <ul className="space-y-3">
                  {reqList.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-navy-300 text-sm md:text-base">
                      <FiCheckCircle className="text-emerald-400 shrink-0 mt-1" size={16} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Opportunities & Outcomes */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
                <FiAnchor className="text-amber-400" /> Career Growth & Progression
              </h2>

              {course.outcome && (
                <div>
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                    Qualification Outcome
                  </h3>
                  <p className="text-navy-300 text-sm md:text-base bg-navy-950 p-4 rounded-xl border border-navy-800">
                    {course.outcome}
                  </p>
                </div>
              )}

              {course.careerSea && (
                <div>
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Progression at Sea (Fleet Rank Ladder)
                  </h3>
                  <p className="text-navy-200 font-semibold text-sm md:text-base bg-navy-950 p-4 rounded-xl border border-navy-800">
                    {course.careerSea}
                  </p>
                </div>
              )}

              {course.careerAshore && (
                <div>
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    Career Opportunities Ashore
                  </h3>
                  <p className="text-navy-300 text-sm md:text-base bg-navy-950 p-4 rounded-xl border border-navy-800">
                    {course.careerAshore}
                  </p>
                </div>
              )}

              {course.careerPath && !course.careerSea && (
                <div>
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Career Progression Path
                  </h3>
                  <p className="text-navy-200 text-sm md:text-base bg-navy-950 p-4 rounded-xl border border-navy-800">
                    {course.careerPath}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: ACTION SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* Enrollment Action Card */}
            <div className="bg-navy-900 border border-blue-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl sticky top-28">
              <div className="badge-blue">Admissions Open</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Enroll?</h3>
                <p className="text-navy-400 text-xs leading-relaxed">
                  Take the first step towards a prestigious international maritime career. Contact our
                  admissions department today.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/contact?course=${encodeURIComponent(course.title)}`}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <FiSend /> Apply For This Course
                </Link>

                <Link
                  to="/contact"
                  className="w-full bg-navy-950 hover:bg-navy-850 text-navy-300 hover:text-white font-semibold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 border border-navy-800 transition-all cursor-pointer"
                >
                  Inquire Admission Desk
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-6 border-t border-navy-800 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-navy-300">
                  <FiShield className="text-emerald-400 shrink-0" size={16} />
                  <span>IMO STCW & DGMS Approved</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-300">
                  <FiAward className="text-amber-400 shrink-0" size={16} />
                  <span>100% Placement Record with 150+ Partners</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-300">
                  <FiClock className="text-blue-400 shrink-0" size={16} />
                  <span>Flexible Contractual Seafaring Cycles</span>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800">
                <button
                  onClick={() => navigate(-1)}
                  className="text-xs text-navy-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiArrowLeft /> Back to Courses Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
