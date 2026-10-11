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
        if (res.data?.data && Array.isArray(res.data.data)) {
          setNews(res.data.data)
        } else {
          setNews([])
        }
      } catch {
        setNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const allNews = news
  const featured = allNews.find((n) => n.featured)
  const rest = featured ? allNews.filter((n) => n._id !== featured._id) : allNews

  const filtered = rest.filter((n) => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.title?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const bulletinItems = news.filter((n) => n.category === 'Bulletin' || n.category === 'Announcement')
  const eventItems = news.filter((n) => n.category === 'Event')

  return (
    <div className="pt-[96px]">
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
              <p className="text-navy-400 text-lg">
                {news.length === 0 ? 'No news published yet.' : 'No news found for the selected filters.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RECENT BULLETINS & EVENTS */}
      {(bulletinItems.length > 0 || eventItems.length > 0) && (
        <section className="py-20 bg-navy-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {bulletinItems.length > 0 && (
                <div>
                  <div className="badge-blue mb-4">Official Publications</div>
                  <h2 className="text-3xl font-bold text-white mb-6">Recent Academy Bulletins</h2>
                  <div className="space-y-3">
                    {bulletinItems.slice(0, 5).map((b) => (
                      <div key={b._id} className="flex items-center gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-blue-500/40 transition-colors group">
                        <div className="text-navy-400 text-xs font-medium bg-navy-800 px-2.5 py-1.5 rounded text-center shrink-0">
                          {new Date(b.publishedAt || b.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{b.title}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded border shrink-0 ${
                          b.category === 'Bulletin' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' :
                          'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {b.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {eventItems.length > 0 && (
                <div>
                  <div className="badge-blue mb-4">On Campus</div>
                  <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
                  <div className="space-y-4">
                    {eventItems.slice(0, 4).map((event) => (
                      <div key={event._id} className="flex gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-blue-500/40 transition-colors group">
                        <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl px-3 py-2 text-center shrink-0 min-w-16">
                          <div className="text-blue-400 text-xs font-bold">
                            {new Date(event.publishedAt || event.createdAt).toLocaleString('default', { month: 'short' })}
                          </div>
                          <div className="text-white text-lg font-bold leading-tight">
                            {new Date(event.publishedAt || event.createdAt).getDate()}
                          </div>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{event.title}</p>
                          {event.excerpt && (
                            <p className="text-navy-400 text-xs mt-1 line-clamp-2">{event.excerpt}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
