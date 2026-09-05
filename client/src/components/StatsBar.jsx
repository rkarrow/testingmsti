export default function StatsBar({ stats, dark = false }) {
  return (
    <div className={`${dark ? 'bg-navy-900 border border-navy-800' : 'bg-blue-600/10 border border-blue-500/20'} rounded-2xl px-6 py-6`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-navy-700">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-navy-400 text-xs md:text-sm mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
