import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FiUsers, FiTrendingUp, FiMonitor, FiGlobe,
  FiBarChart2, FiActivity, FiEye, FiMousePointer,
  FiSmartphone, FiRefreshCw, FiClock, FiAlertCircle
} from 'react-icons/fi'

// ─── Simple SVG Sparkline ──────────────────────────────────────────────────────
function Sparkline({ points = [], height = 60, color = '#3b82f6' }) {
  if (!points.length) return <div className="h-14 bg-navy-800/50 rounded animate-pulse" />
  const values = points.map(p => p.views || p || 0)
  const max = Math.max(...values) || 1
  const min = Math.min(...values)
  const w = 300; const h = height
  const pts = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon fill="url(#grad)" points={`0,${h} ${pts} ${w},${h}`} />
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts}
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

// ─── Bar Row ──────────────────────────────────────────────────────────────────
function BarRow({ label, value, pct, color = '#3b82f6', maxPct = 100 }) {
  const w = Math.min((pct / maxPct) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <div className="w-36 text-xs text-navy-300 truncate shrink-0">{label}</div>
      <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
      <div className="w-14 text-right text-xs text-navy-400 shrink-0 font-medium">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  )
}

// ─── Donut / Pie Chart ────────────────────────────────────────────────────────
const PIE_COLORS = ['#3b82f6', '#f97316', '#22c55e', '#a855f7', '#ec4899', '#14b8a6']
function PieChart({ data = [] }) {
  if (!data.length) return <div className="w-32 h-32 rounded-full bg-navy-800 animate-pulse mx-auto" />
  const total = data.reduce((s, d) => s + d.count, 0) || 1
  let cumulative = 0
  const cx = 60; const cy = 60; const r = 50
  const slices = data.map((d, i) => {
    const pct = d.count / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    cumulative += pct
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    return { ...d, pct: Math.round(pct * 1000) / 10, x1, y1, x2, y2, largeArc: pct > 0.5 ? 1 : 0, color: PIE_COLORS[i % PIE_COLORS.length] }
  })
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      {slices.map((s, i) => (
        <path key={i} d={`M ${cx} ${cy} L ${s.x1} ${s.y1} A ${r} ${r} 0 ${s.largeArc} 1 ${s.x2} ${s.y2} Z`}
          fill={s.color} opacity={0.9} />
      ))}
      <circle cx={cx} cy={cy} r={30} fill="#0f172a" />
    </svg>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton({ className = '' }) {
  return <div className={`bg-navy-800/60 rounded-xl animate-pulse ${className}`} />
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [days, setDays] = useState(30)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchAnalytics = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.get(`/api/track/analytics?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setData(res.data.data)
      } else {
        setError('Failed to load analytics data.')
      }
    } catch (err) {
      setError('Could not connect to analytics endpoint.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAnalytics() }, [days])

  const tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'audience',  label: 'Audience' },
    { id: 'traffic',   label: 'Traffic Sources' },
    { id: 'behavior',  label: 'Behavior' },
  ]

  const deviceColors = { mobile: '#3b82f6', desktop: '#f97316', tablet: '#22c55e', unknown: '#64748b' }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Website Analytics</h1>
          <p className="text-navy-400 text-sm mt-1">Real visitor data tracked from your website</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date range */}
          <select
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="bg-navy-900 border border-navy-700 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last 1 year</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-navy-900 border border-navy-700 text-navy-300 hover:text-white rounded-xl text-sm transition-colors cursor-pointer"
          >
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3.5 rounded-xl text-sm flex items-center gap-3">
          <FiAlertCircle size={18} />
          {error}
          {data === null && <span className="text-navy-500 ml-1">— Visitors will appear here once they visit your site.</span>}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total Page Views',
            value: loading ? '...' : (data?.summary?.totalViews || 0).toLocaleString(),
            sub: `${(data?.summary?.periodViews || 0).toLocaleString()} in last ${days}d`,
            icon: FiEye, color: 'text-blue-400', bg: 'bg-blue-600/15'
          },
          {
            label: 'Unique Sessions',
            value: loading ? '...' : (data?.summary?.totalSessions || 0).toLocaleString(),
            sub: `${(data?.summary?.periodSessions || 0).toLocaleString()} in last ${days}d`,
            icon: FiUsers, color: 'text-emerald-400', bg: 'bg-emerald-600/15'
          },
          {
            label: 'Top Page',
            value: loading ? '...' : (data?.topPages?.[0]?.page || '—'),
            sub: `${(data?.topPages?.[0]?.views || 0).toLocaleString()} views`,
            icon: FiTrendingUp, color: 'text-purple-400', bg: 'bg-purple-600/15'
          },
          {
            label: 'Top Source',
            value: loading ? '...' : (data?.referrers?.[0]?._id || 'direct'),
            sub: `${(data?.referrers?.[0]?.sessions || 0).toLocaleString()} sessions`,
            icon: FiGlobe, color: 'text-orange-400', bg: 'bg-orange-600/15'
          },
        ].map((card, i) => (
          <div key={i} className="bg-navy-900 border border-navy-700 rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon size={18} className={card.color} />
            </div>
            <div className="text-xl font-black text-white truncate">{card.value}</div>
            <div className="text-xs text-navy-400 mt-0.5">{card.label}</div>
            {!loading && <div className="text-[11px] text-navy-500 mt-1">{card.sub}</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-navy-800 pb-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
              activeTab === t.id ? 'text-white bg-blue-600' : 'text-navy-400 hover:text-white hover:bg-navy-800'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Trend chart */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold">Daily Page Views</h3>
                <p className="text-navy-400 text-xs mt-0.5">Last {days} days — real visitor traffic</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">
                  {loading ? '...' : (data?.summary?.periodViews || 0).toLocaleString()}
                </div>
                <div className="text-xs text-navy-400">views this period</div>
              </div>
            </div>
            {loading
              ? <Skeleton className="h-20 w-full" />
              : <Sparkline points={data?.dailyTrend || []} height={80} />
            }
            {!loading && data?.dailyTrend?.length > 0 && (
              <div className="flex justify-between text-[10px] text-navy-500 mt-1">
                <span>{data.dailyTrend[0]?.date}</span>
                <span>{data.dailyTrend[Math.floor(data.dailyTrend.length / 2)]?.date}</span>
                <span>{data.dailyTrend[data.dailyTrend.length - 1]?.date}</span>
              </div>
            )}
            {!loading && (!data?.dailyTrend?.length) && (
              <div className="h-20 flex items-center justify-center text-navy-500 text-sm">
                No data yet — visitors will appear here automatically
              </div>
            )}
          </div>

          {/* Device + Top Pages */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FiSmartphone size={16} className="text-blue-400" /> Device Type
              </h3>
              {loading
                ? <Skeleton className="h-32" />
                : (
                  <div className="flex items-center gap-6">
                    <PieChart data={data?.devices || []} />
                    <div className="space-y-2.5">
                      {(data?.devices || []).map((d, i) => {
                        const total = (data?.devices || []).reduce((s, x) => s + x.count, 0) || 1
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm shrink-0"
                              style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                            <span className="text-navy-300 text-xs capitalize">{d._id}</span>
                            <span className="text-white text-xs font-bold ml-auto">
                              {Math.round(d.count / total * 100)}%
                            </span>
                          </div>
                        )
                      })}
                      {!data?.devices?.length && (
                        <p className="text-navy-500 text-xs">No data yet</p>
                      )}
                    </div>
                  </div>
                )
              }
            </div>

            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FiEye size={16} className="text-blue-400" /> Top Pages
              </h3>
              {loading
                ? <Skeleton className="h-32" />
                : (
                  <div className="space-y-3">
                    {(data?.topPages || []).slice(0, 6).map((p, i) => {
                      const maxViews = data.topPages[0]?.views || 1
                      return (
                        <BarRow key={i} label={p.page} value={p.views}
                          pct={(p.views / maxViews) * 100} maxPct={100} color="#3b82f6" />
                      )
                    })}
                    {!data?.topPages?.length && (
                      <p className="text-navy-500 text-sm">No page views recorded yet</p>
                    )}
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}

      {/* ── AUDIENCE ── */}
      {activeTab === 'audience' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Operating System</h3>
            {loading ? <Skeleton className="h-40" /> : (
              <div className="space-y-4">
                {(data?.osStats || []).map((o, i) => {
                  const max = data.osStats[0]?.count || 1
                  return <BarRow key={i} label={o._id} value={o.count}
                    pct={(o.count / max) * 100} color="#3b82f6" />
                })}
                {!data?.osStats?.length && <p className="text-navy-500 text-sm">No data yet</p>}
              </div>
            )}
          </div>

          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Browser</h3>
            {loading ? <Skeleton className="h-40" /> : (
              <div className="space-y-4">
                {(data?.browsers || []).map((b, i) => {
                  const max = data.browsers[0]?.count || 1
                  return <BarRow key={i} label={b._id} value={b.count}
                    pct={(b.count / max) * 100} color="#8b5cf6" />
                })}
                {!data?.browsers?.length && <p className="text-navy-500 text-sm">No data yet</p>}
              </div>
            )}
          </div>

          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 md:col-span-2">
            <h3 className="text-white font-bold mb-4">Device Breakdown</h3>
            {loading ? <Skeleton className="h-24" /> : (
              <div className="flex items-center gap-10">
                <PieChart data={data?.devices || []} />
                <div className="grid grid-cols-3 gap-6">
                  {(data?.devices || []).map((d, i) => {
                    const total = (data?.devices || []).reduce((s, x) => s + x.count, 0) || 1
                    return (
                      <div key={i} className="text-center">
                        <div className="w-4 h-4 rounded mx-auto mb-2"
                          style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <div className="text-2xl font-black text-white">
                          {Math.round(d.count / total * 100)}%
                        </div>
                        <div className="text-navy-400 text-xs capitalize">{d._id}</div>
                        <div className="text-navy-500 text-xs">{d.count.toLocaleString()} visits</div>
                      </div>
                    )
                  })}
                  {!data?.devices?.length && <p className="text-navy-500 text-sm">No data yet</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TRAFFIC SOURCES ── */}
      {activeTab === 'traffic' && (
        <div className="space-y-6">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FiTrendingUp size={16} className="text-blue-400" /> Traffic Sources
            </h3>
            {loading ? <Skeleton className="h-48" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-800">
                      <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Source</th>
                      <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">Sessions</th>
                      <th className="text-right text-xs text-navy-400 font-semibold py-2">% Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800">
                    {(data?.referrers || []).map((r, i) => {
                      const total = (data?.referrers || []).reduce((s, x) => s + x.sessions, 0) || 1
                      const pct = Math.round(r.sessions / total * 100)
                      const src = r._id || 'direct'
                      return (
                        <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                          <td className="py-3 pr-4 text-xs font-medium">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold mr-2 ${
                              src === 'direct' ? 'bg-navy-700 text-navy-300' :
                              'bg-blue-500/15 text-blue-400'
                            }`}>{src}</span>
                          </td>
                          <td className="py-3 pr-4 text-right text-xs text-navy-200 font-medium">
                            {r.sessions.toLocaleString()}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-navy-400 w-8 text-right">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {!data?.referrers?.length && (
                      <tr><td colSpan={3} className="py-8 text-center text-navy-500 text-sm">No traffic data yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BEHAVIOR ── */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          {/* Top Pages table */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FiEye size={16} className="text-blue-400" /> All Pages
            </h3>
            {loading ? <Skeleton className="h-48" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-800">
                      <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Page</th>
                      <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">Views</th>
                      <th className="text-right text-xs text-navy-400 font-semibold py-2">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800">
                    {(data?.topPages || []).map((p, i) => {
                      const total = data?.summary?.totalViews || 1
                      const pct = Math.round(p.views / total * 100)
                      return (
                        <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                          <td className="py-3 pr-4 text-blue-400 text-xs font-mono">{p.page}</td>
                          <td className="py-3 pr-4 text-right text-xs text-navy-200 font-medium">{p.views.toLocaleString()}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-12 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(pct * 4, 100)}%` }} />
                              </div>
                              <span className="text-xs text-navy-400 w-8 text-right">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {!data?.topPages?.length && (
                      <tr><td colSpan={3} className="py-8 text-center text-navy-500 text-sm">No page view data yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent visits */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FiClock size={16} className="text-blue-400" /> Recent Visits (Live)
            </h3>
            {loading ? <Skeleton className="h-48" /> : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {(data?.recent || []).map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-navy-800/50 text-xs">
                    <span className="text-blue-400 font-mono">{r.page}</span>
                    <div className="flex items-center gap-3 text-navy-400">
                      <span className="capitalize">{r.device}</span>
                      <span>{r.browser}</span>
                      <span className="text-navy-500">{new Date(r.timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
                {!data?.recent?.length && (
                  <p className="text-center text-navy-500 text-sm py-8">No recent visits recorded yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-navy-900/40 border border-navy-800 rounded-xl">
        <p className="text-navy-500 text-xs text-center">
          📊 Live tracking — data updates with every real visitor to your website. Admin pages are excluded.
        </p>
      </div>
    </div>
  )
}
