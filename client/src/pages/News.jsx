import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSearch, FiCalendar, FiTag, FiFilter } from 'react-icons/fi'
import NewsCard from '../components/NewsCard'
import CTASection from '../components/CTASection'

const stats = [
  { value: '100%', label: 'Placement Rate' },
  { value: '150+', label: 'Shipping Partners' },
  { value: '3+', label: 'News Monthly' },
  { value: 'IMO', label: 'Accredited' },
]

const staticNews = [
  {
    _id: 1,
    title: 'Global Shipping Giant Signs Guaranteed Cadet Placement Agreement with MSTI',
    content: 'In a landmark development for Sri Lankan maritime education, MSTI has signed a comprehensive cadet placement agreement...',
    excerpt: 'MSTI signs guaranteed placement agreement with global shipping giant, securing maritime careers for all graduating cadets.',
    category: 'News',
    featured: true,
    publishedAt: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
  },
  {
    _id: 2,
    title: 'MSTI Achieves ISO 9001:2015 Certification for Maritime Training Excellence',
    excerpt: 'Prestigious ISO 9001:2015 awarded for quality management in maritime training.',
    category: 'Achievement',
    publishedAt: '2026-07-22',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600',
  },
  {
    _id: 3,
    title: 'New State-of-the-Art Bridge Simulator Commissioned at MSTI Campus',
    excerpt: 'New $4.3M full-mission bridge simulator enhances cadet training at MSTI campus.',
    category: 'Announcement',
    publishedAt: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
  },
  {
    _id: 4,
    title: 'MSTI Cadets Excel at International Maritime Competition 2026',
    excerpt: 'MSTI cadets win gold at International Maritime Skills Competition in Singapore.',
    category: 'Achievement',
    publishedAt: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
  },
  {
    _id: 5,
    title: 'July 2026 Intake: Applications Now Open for Officer Cadetship',
    excerpt: 'Applications open for July 2026 Officer Cadetship intake. Limited seats available.',
    category: 'Bulletin',
    publishedAt: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600',
  },
  {
    _id: 6,
    title: 'Partnership with Port Authority of Sri Lanka for Practical Training',
    excerpt: 'New partnership with Port Authority of Sri Lanka provides cadets with hands-on port training.',
    category: 'News',
    publishedAt: '2026-03-12',
    image: 'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=600',
  },
]

const bulletins = [
  { date: 'Aug 2026', title: 'August Monthly Academy Bulletin', tag: 'Bulletin' },
  { date: 'Jul 2026', title: 'Cadetship Programme Circular No. 12/2026', tag: 'Announcement' },
  { date: 'Jun 2026', title: 'Examination Schedule — Second Semester 2026', tag: 'Bulletin' },
  { date: 'May 2026', title: 'Updated Medical Standards for Maritime Cadets', tag: 'Announcement' },
  { date: 'Apr 2026', title: 'MSTI Scholarship Programme 2026 — Applications Open', tag: 'News' },
]

const categories = ['All', 'News', 'Announcement', 'Event', 'Bulletin', 'Achievement']

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news')
        setNews(res.data.data)
      } catch {
        setNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const allNews = news.length > 0 ? news : staticNews
  const featured = allNews.find((n) => n.featured) || allNews[0]
  const rest = allNews.filter((n) => n._id !== featured._id)

  const filtered = rest.filter((n) => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600"
            alt="MSTI News"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="badge-blue mb-4">Media Centre</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              News, Announcements & Maritime Events
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              Stay informed with the latest developments, achievements, and announcements from the MSTI maritime community.
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

      {/* FEATURED NEWS */}
      {featured && (
        <section className="py-16 bg-navy-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="badge-blue mb-6">Featured Story</div>
            <NewsCard article={featured} featured />
          </div>
        </section>
      )}

      {/* NEWS GRID */}
      <section className="py-10 pb-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" size={16} />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-navy-800 text-navy-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-44 bg-navy-800" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-navy-800 rounded w-3/4" />
                    <div className="h-3 bg-navy-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-navy-400 text-lg">No news found for the selected filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* RECENT BULLETINS */}
      <section className="py-20 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="badge-blue mb-4">Official Publications</div>
              <h2 className="text-3xl font-bold text-white mb-6">Recent Academy Bulletins</h2>
              <div className="space-y-3">
                {bulletins.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-blue-500/40 transition-colors cursor-pointer group">
                    <div className="text-navy-400 text-xs font-medium bg-navy-800 px-2.5 py-1.5 rounded text-center w-16 flex-shrink-0">
                      {b.date}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{b.title}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ${
                      b.tag === 'Bulletin' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' :
                      b.tag === 'Announcement' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' :
                      'bg-blue-600/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {b.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="badge-blue mb-4">On Campus</div>
              <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {[
                  { date: 'Sep 15, 2026', title: 'Open Day — July 2026 Intake Orientation', location: 'MSTI Main Campus, Colombo', type: 'Event' },
                  { date: 'Oct 01, 2026', title: 'Annual Maritime Skills Day 2026', location: 'Port of Colombo, Sri Lanka', type: 'Event' },
                  { date: 'Oct 20, 2026', title: 'Semester Examinations — Second Semester', location: 'MSTI Examination Hall', type: 'Announcement' },
                  { date: 'Nov 05, 2026', title: 'MSTI Annual Graduation Ceremony 2026', location: 'Bandaranaike Memorial Hall, Colombo', type: 'Event' },
                ].map((event, i) => (
                  <div key={i} className="flex gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-blue-500/40 transition-colors group">
                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl px-3 py-2 text-center flex-shrink-0 w-16">
                      <div className="text-blue-400 text-xs font-bold">{event.date.split(' ')[0]}</div>
                      <div className="text-white text-lg font-bold leading-tight">{event.date.split(' ')[1].replace(',','')}</div>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{event.title}</p>
                      <p className="text-navy-500 text-xs mt-1 flex items-center gap-1">
                        📍 {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready To Start Your Maritime Journey?"
        subtitle="Join MSTI's next intake and become part of a global maritime success story."
        primaryLabel="Apply Now"
        primaryTo="/contact"
        secondaryLabel="View Courses"
        secondaryTo="/courses"
      />
    </div>
  )
}
