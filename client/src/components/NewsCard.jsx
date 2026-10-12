import { Link } from 'react-router-dom'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'

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
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsCard({ article, featured = false }) {
  const colorClass = categoryColors[article.category] || categoryColors.News
  const articleUrl = `/news/${article._id}`

  if (featured) {
    return (
      <Link
        to={articleUrl}
        className="card group hover-lift md:flex cursor-pointer transition-all border-navy-800 hover:border-blue-500/40"
      >
        <div className="md:w-2/5 relative overflow-hidden h-56 md:h-auto min-h-[240px]">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-navy-800 flex items-center justify-center">
              <span className="text-navy-600 text-5xl">📰</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900/20" />
        </div>
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${colorClass}`}>
                {article.category || 'News'}
              </span>
              {article.featured && (
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-xl md:text-2xl mb-3 group-hover:text-blue-400 transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-navy-400 text-sm leading-relaxed line-clamp-3">
              {article.excerpt || (article.content ? article.content.substring(0, 180) + '...' : '')}
            </p>
          </div>
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-navy-800">
            <div className="flex items-center gap-1.5 text-navy-500 text-xs">
              <FiCalendar size={12} />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <span className="text-blue-400 group-hover:text-blue-300 text-sm font-semibold flex items-center gap-1.5 transition-colors">
              Read Article <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={articleUrl}
      className="card group hover-lift flex flex-col cursor-pointer transition-all border-navy-800 hover:border-blue-500/40"
    >
      <div className="relative overflow-hidden h-48">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-navy-800 flex items-center justify-center">
            <span className="text-navy-600 text-4xl">📰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${colorClass}`}>
          {article.category || 'News'}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-navy-400 text-xs line-clamp-2 leading-relaxed mb-3">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between text-navy-500 text-xs pt-3 border-t border-navy-800">
          <div className="flex items-center gap-1.5">
            <FiCalendar size={11} />
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>
          <span className="text-blue-400 text-xs font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Read <FiArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}
