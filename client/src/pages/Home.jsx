import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin, FiExternalLink, FiDownload, FiMonitor, FiTool, FiLifeBuoy, FiHome } from 'react-icons/fi'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [news, setNews] = useState([])
  const [settings, setSettings] = useState({
    heroBadge: "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
    heroTitle: "The Premier Maritime Academy in Sri Lanka",
    heroSubtitle: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
    heroBgImage: "/hero-image.jpg",
    heroPrimaryCtaText: "Explore Programs",
    heroPrimaryCtaLink: "/courses",
    heroSecondaryCtaText: "Book a Campus Visit",
    heroSecondaryCtaLink: "/contact",
    stats: [
      { value: '12:1', label: 'STUDENT-FACULTY RATIO' },
      { value: '94%', label: 'FLEET PLACEMENT RATE' },
      { value: '180+', label: 'ACADEMIC & SEA PROGRAMS' },
      { value: '$42M', label: 'TRAINING SIMULATORS & FLEET' },
    ],
    aboutBadge: "ABOUT US",
    aboutTitle: "The Premier Maritime Academy in Sri Lanka",
    aboutDesc1: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance.",
    aboutDesc2: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training.",
    aboutLeaderName: "Capt. Ayesha Fernando",
    aboutLeaderRole: "Valedictorian • Officer of the Watch (STCW II/1)",
    aboutLeaderImage: "/captain.jpg",
  })
  const [loading, setLoading] = useState(true)

  const heroSlides = [
    {
      image: settings.heroBgImage || '/hero-image.jpg',
      badge: settings.heroBadge || "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
      title: settings.heroTitle || "The Premier Maritime Academy in Sri Lanka",
      subtitle: settings.heroSubtitle || "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
    },
    {
      image: '/hero-image-2.jpg',
      badge: "🌐 180° FULL MISSION NAVIGATION SIMULATORS",
      title: "State-of-the-Art Bridge & Radar Simulation",
      subtitle: "Train on industry-leading Transas & Kongsberg bridge navigation simulators mirroring real-world ocean vessels and weather conditions.",
    },
    {
      image: '/hero-image-3.jpg',
      badge: "⚙️ MARINE ENGINEERING LABS & WORKSHOPS",
      title: "Advanced Propulsion & Mechanical Engineering",
      subtitle: "Hands-on engineering cadetship working with heavy marine diesel engines, automation systems, and electrical control panels.",
    },
    {
      image: '/hero-image-4.jpg',
      badge: "🎓 IMO STCW OFFICER CADET GRADUATION",
      title: "Global Merchant Navy Fleet Placement",
      subtitle: "Our accredited graduates serve as certified Deck & Engineering Officers on leading international commercial fleets worldwide.",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 4)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 4) % 4)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, nRes, sRes] = await Promise.all([
          axios.get('/api/courses?featured=true&limit=4'),
          axios.get('/api/news?limit=3'),
          axios.get('/api/settings'),
        ])
        if (cRes.data?.data) setCourses(cRes.data.data)
        if (nRes.data?.data) setNews(nRes.data.data)
        if (sRes.data?.data) setSettings((prev) => ({ ...prev, ...sRes.data.data }))
      } catch (err) {
        console.error('Failed to fetch dynamic website data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const activeSlideData = heroSlides[currentSlide]

  return (
    <div className="pt-20 sm:pt-28"> {/* Offset for navbar & top bar */}
      {/* HERO SECTION - DYNAMIC SLIDER */}
      <section className="relative h-[650px] md:h-[75vh] min-h-[600px] flex items-center overflow-hidden bg-navy-950">
        {/* Background Images with Fade Transition */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={`Maritime Slide ${index + 1}`}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/hero-image.jpg'
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/30" />
          </div>
        ))}

        {/* Left / Right Chevron Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-navy-950/70 hover:bg-amber-500 text-white hover:text-navy-950 rounded-full flex items-center justify-center transition-all duration-300 z-20 border border-white/20 shadow-lg group cursor-pointer"
        >
          <FiChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-navy-950/70 hover:bg-amber-500 text-white hover:text-navy-950 rounded-full flex items-center justify-center transition-all duration-300 z-20 border border-white/20 shadow-lg group cursor-pointer"
        >
          <FiChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/40 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest px-4 py-2 rounded-lg uppercase mb-6 border border-blue-400/40 shadow-sm animate-fadeIn">
              {activeSlideData.badge}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight animate-fadeIn">
              {activeSlideData.title}
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-8 max-w-xl animate-fadeIn">
              {activeSlideData.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to={settings.heroPrimaryCtaLink || '/courses'}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wider uppercase px-7 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/40 border border-blue-400/30 hover:scale-105"
              >
                {settings.heroPrimaryCtaText || 'Explore Programs'} <FiArrowRight />
              </Link>
              <Link
                to={settings.heroSecondaryCtaLink || '/contact'}
                className="bg-navy-950/80 hover:bg-navy-900 backdrop-blur-md text-white font-bold text-sm tracking-wider uppercase px-7 py-4 rounded-xl inline-flex items-center justify-center transition-all border border-white/20 hover:border-amber-400 hover:text-amber-400 shadow-md"
              >
                {settings.heroSecondaryCtaText || 'Book a Campus Visit'}
              </Link>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    i === currentSlide
                      ? 'w-10 h-2.5 bg-amber-400 rounded-full shadow-md shadow-amber-400/50'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-navy-950 py-10 border-b border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {(settings.stats || []).map((s, i) => (
              <div key={i} className="text-left px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left Image Side */}
            <div className="lg:w-1/2 relative rounded-xl overflow-hidden shadow-xl min-h-[500px]">
              <img
                src={settings.aboutLeaderImage || '/captain.jpg'}
                alt={settings.aboutLeaderName || 'Cadet Leader'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/captain.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-2">
                  CADET CORPS LEADERSHIP
                </p>
                <h3 className="text-white text-2xl font-bold mb-1">
                  {settings.aboutLeaderName}
                </h3>
                <p className="text-white/70 text-sm">
                  {settings.aboutLeaderRole}
                </p>
              </div>
            </div>

            {/* Right Content Card */}
            <div className="lg:w-1/2 bg-navy-950 rounded-xl p-8 md:p-12 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {settings.aboutBadge || 'ABOUT US'}
                </span>
                <span className="w-12 h-px bg-blue-600"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {settings.aboutTitle}
              </h2>
              <p className="text-navy-200 text-sm md:text-base leading-relaxed mb-4">
                {settings.aboutDesc1}
              </p>
              <p className="text-navy-200 text-sm md:text-base leading-relaxed mb-10">
                {settings.aboutDesc2}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded inline-flex items-center justify-center gap-2 transition-colors">
                  View Courses <FiArrowRight />
                </Link>
                <Link to="/about" className="bg-navy-900 hover:bg-navy-800 border border-navy-800 text-white font-semibold px-6 py-3 rounded inline-flex items-center justify-center transition-colors">
                  Student Life
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION - DYNAMIC */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-2">
              CERTIFIED MERCHANT CADET PATHWAYS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Courses</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.length > 0 ? (
              courses.map((course, i) => (
                <div key={course._id || i} className="relative rounded-xl overflow-hidden group cursor-pointer h-72">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                    {course.category} • {course.duration}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">{course.title}</h3>
                      <p className="text-white/70 text-sm line-clamp-1">{course.shortDescription || course.description}</p>
                    </div>
                    <Link
                      to="/courses"
                      className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors shrink-0"
                    >
                      <FiArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-navy-400 py-12">
                No courses available currently.
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors">
              View All Courses & Programs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST NEWS & EVENTS - DYNAMIC */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                DISPATCHES & COMMENCEMENTS
              </div>
              <h2 className="text-3xl font-extrabold text-navy-950">Latest News & Events</h2>
            </div>
            <Link to="/news" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
              View News Archive <FiArrowRight />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {news.length > 0 && (
              <div className="relative rounded-xl overflow-hidden h-[400px] group cursor-pointer shadow-lg border border-gray-100">
                <img
                  src={news[0].image || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'}
                  alt={news[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-block mb-3">
                    {news[0].category || 'FEATURED NEWS'}
                  </span>
                  <h3 className="text-white font-bold text-2xl mb-3 leading-tight">
                    {news[0].title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {news[0].excerpt || news[0].content}
                  </p>
                  <Link to="/news" className="text-white text-xs font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors">
                    Read Full Article <FiExternalLink size={14} />
                  </Link>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6">
              {news.slice(1, 3).map((item, i) => (
                <div key={item._id || i} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                    <span className="text-navy-400 text-[10px] font-semibold">
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-navy-950 font-bold text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{item.excerpt || item.content}</p>
                  <Link to="/news" className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1 mt-auto self-end">
                    Read Article <FiArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-24 pt-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-navy-900 rounded-3xl p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3 text-left">
              <div className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-3">
                ADMISSIONS OPEN • BATCH 2025/2026
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Ready To Start Your<br/>Journey?
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
                Take the helm of your career. Join Sri Lanka's leading academy for international merchant navy cadets. Scholarship programs and sea-time assistance available.
              </p>
            </div>
            
            <div className="md:w-1/3 flex flex-col sm:flex-row gap-3 justify-end w-full">
              <Link to="/contact" className="bg-white hover:bg-gray-50 text-blue-600 text-sm font-semibold px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors flex-1 shadow-lg whitespace-nowrap">
                Apply For Admission <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
