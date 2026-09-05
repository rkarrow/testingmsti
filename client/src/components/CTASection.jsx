import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function CTASection({ title, subtitle, primaryLabel, primaryTo, secondaryLabel, secondaryTo, dark = true }) {
  return (
    <section className={`${dark ? 'bg-gradient-to-r from-navy-900 to-navy-800' : 'bg-blue-600'} py-20`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {subtitle && <p className="text-navy-300 text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryLabel && (
            <Link to={primaryTo || '/contact'} className="btn-primary px-8 py-3.5 text-base">
              {primaryLabel} <FiArrowRight />
            </Link>
          )}
          {secondaryLabel && (
            <Link to={secondaryTo || '/courses'} className="btn-secondary px-8 py-3.5 text-base">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
