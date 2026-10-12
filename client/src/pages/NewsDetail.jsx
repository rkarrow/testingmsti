import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiArrowLeft,
  FiArrowRight,
  FiShare2,
  FiCheck,
  FiClock,
  FiBookOpen,
} from 'react-icons/fi'

const categoryColors = {
  News: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  Announcement: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
  Event: 'bg-green-600/20 text-green-400 border-green-500/30',
  Bulletin: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
  Achievement: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchArticleAndRecent = async () => {
      setLoading(true)
      try {
        const [articleRes, recentRes] = await Promise.all([
          axios.get(`/api/news/${id}`),
          axios.get('/api/news?limit=6'),
        ])

        if (articleRes.data?.data) {
          setArticle(articleRes.data.data)
        } else {
          setArticle(null)
        }

        if (recentRes.data?.data && Array.isArray(recentRes.data.data)) {
          setRecentNews(recentRes.data.data.filter((n) => n._id !== id))
        }
      } catch (err) {
        console.error('Error fetching news detail:', err)
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticleAndRecent()
    }
  }, [id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-navy-950 flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 border-4 border-navy-800 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-blue-400 font-medium text-sm">Loading article...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-navy-950 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center text-3xl mb-6">
          📰
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Article Not Found</h1>
        <p className="text-navy-400 max-w-md mb-8 text-sm">
          The news story or announcement you are looking for might have been updated or removed.
        </p>
        <Link to="/news" className="btn-primary">
          <FiArrowLeft /> Back to Media Centre
        </Link>
      </div>
    )
  }

  const colorClass = categoryColors[article.category] || categoryColors.News

  return (
    <div className="pt-[96px] bg-navy-950 min-h-screen">
      {/* TOP NAVIGATION BREADCRUMB */}
      <section className="bg-navy-900/60 border-b border-navy-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-400 hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} /> Back to All News & Media
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs text-navy-400 hover:text-blue-400 bg-navy-800/80 hover:bg-navy-800 px-3 py-1.5 rounded-lg border border-navy-700 transition-all cursor-pointer"
          >
            {copied ? <FiCheck className="text-emerald-400" size={13} /> : <FiShare2 size={13} />}
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </section>

      {/* ARTICLE HEADER & MAIN CONTENT */}
      <article className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT / CENTER: MAIN ARTICLE (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Category, Date & Meta */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${colorClass}`}
                  >
                    {article.category || 'News'}
                  </span>
                  {article.featured && (
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      ★ Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-navy-400 pt-2 border-b border-navy-800/80 pb-6">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="text-blue-400" size={14} />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  {article.author && (
                    <div className="flex items-center gap-1.5">
                      <FiUser className="text-blue-400" size={14} />
                      <span>{article.author}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              {article.image && (
                <div className="rounded-3xl overflow-hidden border border-navy-800 bg-navy-900 shadow-2xl relative max-h-[500px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover max-h-[500px]"
                  />
                </div>
              )}

              {/* Excerpt Callout */}
              {article.excerpt && (
                <div className="bg-navy-900/80 border-l-4 border-blue-500 rounded-r-2xl p-6 shadow-lg">
                  <p className="text-base md:text-lg font-medium text-navy-200 leading-relaxed italic">
                    &ldquo;{article.excerpt}&rdquo;
                  </p>
                </div>
              )}

              {/* Full Content Body */}
              <div className="bg-navy-900/40 border border-navy-800/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl space-y-6">
                <div className="text-navy-200 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
                  {article.content}
                </div>

                {/* Tags */}
                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <div className="pt-6 border-t border-navy-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-navy-400 flex items-center gap-1">
                      <FiTag size={12} /> Tags:
                    </span>
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-navy-950 text-navy-300 border border-navy-800 px-3 py-1 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Back Button */}
              <div className="pt-4 flex items-center justify-between border-t border-navy-800">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FiArrowLeft /> Back to Media Centre
                </Link>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 text-xs text-navy-400 hover:text-white bg-navy-900 hover:bg-navy-850 px-4 py-2 rounded-xl border border-navy-800 transition-all cursor-pointer"
                >
                  {copied ? <FiCheck className="text-emerald-400" size={13} /> : <FiShare2 size={13} />}
                  <span>{copied ? 'Copied URL!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDEBAR: RECENT NEWS & INQUIRY CARD (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Recent Stories Sidebar */}
              {recentNews.length > 0 && (
                <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FiBookOpen className="text-blue-400" /> Recent Updates
                    </h3>
                    <Link to="/news" className="text-xs text-blue-400 hover:text-blue-300">
                      View all
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {recentNews.slice(0, 4).map((item) => (
                      <Link
                        key={item._id}
                        to={`/news/${item._id}`}
                        className="group flex gap-3.5 items-start p-2 rounded-xl hover:bg-navy-950/70 transition-colors"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-navy-800 group-hover:border-blue-500/40 transition-colors"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-center shrink-0 text-xl">
                            📰
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block mb-1 ${
                              categoryColors[item.category] || categoryColors.News
                            }`}
                          >
                            {item.category || 'News'}
                          </span>
                          <h4 className="text-white text-xs font-semibold group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-navy-500 text-[10px] block mt-1">
                            {formatDate(item.publishedAt || item.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Maritime Admissions Card */}
              <div className="bg-gradient-to-br from-blue-900/30 to-navy-900 border border-blue-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-blue-600 text-white inline-block">
                  Admissions Open
                </span>
                <h3 className="text-lg font-bold text-white">Join the Merchant Navy</h3>
                <p className="text-navy-300 text-xs leading-relaxed">
                  Start your global maritime seafaring career with MSTI&apos;s IMO & DGMS approved Officer Cadet & Rating training programmes.
                </p>
                <div className="pt-2 space-y-2.5">
                  <Link
                    to="/courses"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Explore Programmes <FiArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full bg-navy-950 hover:bg-navy-850 text-navy-300 hover:text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-navy-800 transition-all cursor-pointer"
                  >
                    Inquire Admissions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
