import { Link } from 'react-router-dom'
import { FiClock, FiArrowRight } from 'react-icons/fi'

export default function CourseCard({ course }) {
  const categoryColors = {
    'Officer Cadetship': 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    'Marine Engineering': 'bg-orange-600/20 text-orange-400 border-orange-500/30',
    'Nautical Science': 'bg-teal-600/20 text-teal-400 border-teal-500/30',
    'Port Management': 'bg-purple-600/20 text-purple-400 border-purple-500/30',
    'Safety & Security': 'bg-red-600/20 text-red-400 border-red-500/30',
    'Specialized Training': 'bg-green-600/20 text-green-400 border-green-500/30',
  }

  const colorClass = categoryColors[course.category] || 'bg-blue-600/20 text-blue-400 border-blue-500/30'

  return (
    <div className="card group hover-lift flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-navy-800 flex items-center justify-center">
            <span className="text-navy-600 text-4xl">⚓</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${colorClass}`}>
          {course.category}
        </span>
        {course.featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors leading-snug">
          {course.title}
        </h3>
        <p className="text-navy-400 text-sm leading-relaxed mb-4 flex-1">
          {course.shortDescription || course.description.substring(0, 100) + '...'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-navy-800">
          <div className="flex items-center gap-1.5 text-navy-400 text-sm">
            <FiClock size={14} />
            <span>{course.duration}</span>
          </div>
          <span className="text-xs font-medium text-navy-500 bg-navy-800 px-2.5 py-1 rounded">
            {course.level}
          </span>
        </div>
      </div>
    </div>
  )
}
