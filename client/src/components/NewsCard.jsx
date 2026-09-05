import { FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi'

const categoryColors = {
  News: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  Announcement: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
  Event: 'bg-green-600/20 text-green-400 border-green-500/30',
  Bulletin: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
  Achievement: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsCard({ article, featured = false }) {
  const colorClass = categoryColors[article.category] || categoryColors.News

  if (featured) {
    return (
      <div className="card group hover-lift md:flex">
        <div className="md:w-2/5 relative overflow-hidden h-56 md:h-auto">
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
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${colorClass}`}>
                {article.category}
              </span>
              {article.featured && (
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-navy-400 text-sm leading-relaxed">
              {article.excerpt || article.content.substring(0, 180) + '...'}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-800">
            <div className="flex items-center gap-1.5 text-navy-500 text-xs">
              <FiCalendar size={12} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors">
              Read More <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card group hover-lift flex flex-col">
      <div className="relative overflow-hidden h-44">
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
          {article.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-400 transition-colors leading-snug flex-1">
          {article.title}
        </h3>
        <div className="flex items-center gap-1.5 text-navy-500 text-xs mt-2 pt-3 border-t border-navy-800">
          <FiCalendar size={11} />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </div>
  )
}
