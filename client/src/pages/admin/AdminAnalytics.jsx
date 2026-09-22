import { useState } from 'react'
import { FiUsers, FiTrendingUp, FiMonitor, FiGlobe, FiBarChart2, FiActivity, FiEye, FiMousePointer, FiSmartphone } from 'react-icons/fi'

// ─── Real MSTI GA4 Data (Jan 2024 – Sep 2026) ─────────────────────────────────
const summaryCards = [
  { label: 'Active Users',       value: '50.6K',   change: '+1,057.9%', up: true,  icon: FiUsers },
  { label: 'New Users',          value: '50.6K',   change: '+1,060.5%', up: true,  icon: FiTrendingUp },
  { label: 'New User %',         value: '100%',    change: '+0.2%',     up: true,  icon: FiActivity },
  { label: 'Engaged Sessions',   value: '74%',     change: '+0.9%',     up: true,  icon: FiEye },
  { label: 'Pageviews / User',   value: '4.4',     change: '-4.9%',     up: false, icon: FiMonitor },
  { label: 'Avg. Eng. Time',     value: '1:36',    change: '-18.0%',    up: false, icon: FiBarChart2 },
]

const deviceData = [
  { label: 'Mobile',  pct: 77.9, color: '#3b82f6' },
  { label: 'Desktop', pct: 21.4, color: '#f97316' },
  { label: 'Tablet',  pct: 0.7,  color: '#22c55e' },
]

const topCountries = [
  { country: 'Sri Lanka',     users: 47200, pct: 93.2 },
  { country: 'Philippines',   users: 1120,  pct: 2.2 },
  { country: 'United States', users: 750,   pct: 1.5 },
  { country: 'India',         users: 420,   pct: 0.8 },
  { country: 'Singapore',     users: 280,   pct: 0.6 },
  { country: 'UAE',           users: 190,   pct: 0.4 },
  { country: 'Indonesia',     users: 140,   pct: 0.3 },
]

const topOS = [
  { os: 'Android',   users: 30200, pct: 100 },
  { os: 'iOS',       users: 14100, pct: 46.7 },
  { os: 'Windows',   users: 8300,  pct: 27.5 },
  { os: 'Linux',     users: 2100,  pct: 6.9 },
  { os: 'Macintosh', users: 1500,  pct: 5.0 },
  { os: 'Chrome OS', users: 400,   pct: 1.3 },
]

const topBrowsers = [
  { browser: 'Chrome',          users: 40100, pct: 100 },
  { browser: 'Safari',          users: 13200, pct: 32.9 },
  { browser: 'Android Webview', users: 4100,  pct: 10.2 },
  { browser: 'Edge',            users: 2000,  pct: 5.0 },
  { browser: 'Samsung Internet',users: 1100,  pct: 2.7 },
]

const topSources = [
  { source: 'google',        medium: 'organic',  sessions: 55415, pct: 79.0 },
  { source: '(direct)',      medium: '(none)',    sessions: 8192,  pct: 11.7 },
  { source: 'm.facebook.com',medium: 'referral', sessions: 1630,  pct: 2.3 },
  { source: 'bing',          medium: 'organic',  sessions: 1243,  pct: 1.8 },
  { source: 'lm.facebook.com',medium:'referral', sessions: 787,   pct: 1.1 },
  { source: 'l.facebook.com', medium:'referral', sessions: 447,   pct: 0.6 },
  { source: 'mercemarine.net',medium:'referral', sessions: 369,   pct: 0.5 },
]

const topEvents = [
  { event: 'page_view',       count: 221898, pct: 36.7, users: 50523 },
  { event: 'user_engagement', count: 186191, pct: 30.8, users: 38849 },
  { event: 'session_start',   count: 69640,  pct: 11.5, users: 50455 },
  { event: 'scroll',          count: 57549,  pct: 9.5,  users: 28771 },
  { event: 'first_visit',     count: 50619,  pct: 8.4,  users: 50238 },
  { event: 'click',           count: 18109,  pct: 3.0,  users: 11081 },
  { event: 'form_start',      count: 1038,   pct: 0.2,  users: 896   },
  { event: 'form_submit',     count: 49,     pct: '<0.1',users: 42   },
]

const topPages = [
  { path: '/',                                    views: 50223, pct: 22.6, users: 33007 },
  { path: '/courses/',                            views: 20435, pct: 9.2,  users: 14290 },
  { path: '/courses/officer-rating-training/',   views: 20231, pct: 9.1,  users: 13403 },
  { path: '/courses/short-courses/',             views: 19520, pct: 8.8,  users: 13002 },
  { path: '/courses/officer-rating-training/...', views: 18127, pct: 8.2, users: 11417 },
  { path: '/contact-us/',                         views: 9858,  pct: 4.4,  users: 6532  },
]

// Sparkline month data (relative active users trend)
const trendPoints = [130,100,90,110,80,95,120,85,70,90,130,100,150,110,95,80,120,200,160,110,90,100,280,180,120,90,110,100]

function Sparkline({ points, color = '#3b82f6', height = 40 }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 200
  const h = height
  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinejoin="round" strokeLinecap="round" />
      <polyline
        fill={`${color}20`}
        stroke="none"
        points={`0,${h} ${pts} ${w},${h}`}
      />
    </svg>
  )
}

function PieChart({ data }) {
  const r = 60; const cx = 70; const cy = 70
  let cumulative = 0
  const slices = data.map(d => {
    const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
    cumulative += d.pct
    const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = d.pct > 50 ? 1 : 0
    return { ...d, x1, y1, x2, y2, largeArc, cx, cy, r }
  })
  return (
    <svg viewBox="0 0 140 140" className="w-36 h-36">
      {slices.map((s, i) => (
        <path
          key={i}
          d={`M ${s.cx} ${s.cy} L ${s.x1} ${s.y1} A ${s.r} ${s.r} 0 ${s.largeArc} 1 ${s.x2} ${s.y2} Z`}
          fill={s.color}
          opacity={0.9}
        />
      ))}
    </svg>
  )
}

function BarRow({ label, value, pct, color = '#3b82f6', maxPct = 100 }) {
  const w = (pct / maxPct) * 100
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-xs text-navy-300 truncate shrink-0">{label}</div>
      <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
      <div className="w-16 text-right text-xs text-navy-400 shrink-0">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
  )
}

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'audience',  label: 'Audience' },
    { id: 'traffic',   label: 'Traffic Sources' },
    { id: 'behavior',  label: 'Behavior' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Website Analytics</h1>
          <p className="text-navy-400 text-sm mt-1">Google Analytics 4 — Jan 1, 2024 – Sep 21, 2026</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-900 border border-navy-700 rounded-xl px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-navy-300 font-semibold">Live Data</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-navy-900 border border-navy-700 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center mb-3">
              <card.icon size={16} className="text-blue-400" />
            </div>
            <div className="text-xl font-black text-white">{card.value}</div>
            <div className="text-xs text-navy-400 mt-0.5 mb-1">{card.label}</div>
            <div className={`text-[11px] font-semibold ${card.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {card.change} vs prev period
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-navy-800 pb-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all ${
              activeTab === t.id
                ? 'text-white bg-blue-600'
                : 'text-navy-400 hover:text-white hover:bg-navy-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Trend Chart */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold">Active Users Trend</h3>
                <p className="text-navy-400 text-xs mt-0.5">Daily active users over time (Jan 2024 – Sep 2026)</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">50.6K</div>
                <div className="text-xs text-emerald-400 font-semibold">+1,057.9%</div>
              </div>
            </div>
            <Sparkline points={trendPoints} height={80} />
            <div className="flex justify-between text-[10px] text-navy-500 mt-1">
              <span>Jan 2024</span><span>Jul 2024</span><span>Jan 2025</span><span>Jul 2025</span><span>Mar 2026</span><span>Sep 2026</span>
            </div>
          </div>

          {/* 2-col grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Device */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FiSmartphone size={16} className="text-blue-400" /> Device Category
              </h3>
              <div className="flex items-center gap-6">
                <PieChart data={deviceData} />
                <div className="space-y-3">
                  {deviceData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                      <span className="text-navy-300 text-xs">{d.label}</span>
                      <span className="text-white text-xs font-bold ml-auto">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FiGlobe size={16} className="text-blue-400" /> Top Countries
              </h3>
              <div className="space-y-3">
                {topCountries.map((c, i) => (
                  <BarRow key={i} label={c.country} value={c.users} pct={c.pct} maxPct={93.2} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUDIENCE TAB */}
      {activeTab === 'audience' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* OS */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Operating System</h3>
            <div className="space-y-4">
              {topOS.map((o, i) => (
                <BarRow key={i} label={o.os} value={o.users} pct={o.pct} color="#3b82f6" maxPct={100} />
              ))}
            </div>
          </div>

          {/* Browser */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Browser</h3>
            <div className="space-y-4">
              {topBrowsers.map((b, i) => (
                <BarRow key={i} label={b.browser} value={b.users} pct={b.pct} color="#8b5cf6" maxPct={100} />
              ))}
            </div>
          </div>

          {/* Device pie (larger) */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 md:col-span-2">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FiSmartphone size={16} className="text-blue-400" /> Device Breakdown
            </h3>
            <div className="flex items-center gap-10">
              <PieChart data={deviceData} />
              <div className="grid grid-cols-3 gap-6">
                {deviceData.map((d, i) => (
                  <div key={i} className="text-center">
                    <div className="w-4 h-4 rounded mx-auto mb-2" style={{ backgroundColor: d.color }} />
                    <div className="text-2xl font-black text-white">{d.pct}%</div>
                    <div className="text-navy-400 text-xs">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRAFFIC SOURCES TAB */}
      {activeTab === 'traffic' && (
        <div className="space-y-6">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FiTrendingUp size={16} className="text-blue-400" /> Top Traffic Sources
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-800">
                    <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Session Source</th>
                    <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Medium</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">Sessions</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2">% Sessions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {topSources.map((s, i) => (
                    <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                      <td className="py-3 pr-4 text-white text-xs font-medium">{s.source}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          s.medium === 'organic' ? 'bg-emerald-500/15 text-emerald-400' :
                          s.medium === 'referral' ? 'bg-blue-500/15 text-blue-400' :
                          'bg-navy-700 text-navy-400'
                        }`}>{s.medium}</span>
                      </td>
                      <td className="py-3 pr-4 text-right text-xs text-navy-200 font-medium">{s.sessions.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.pct}%` }} />
                          </div>
                          <span className="text-xs text-navy-300 w-10 text-right">{s.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Source Visual */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Source Distribution</h3>
            <div className="space-y-3">
              {topSources.map((s, i) => (
                <BarRow
                  key={i}
                  label={`${s.source} / ${s.medium}`}
                  value={`${s.pct}%`}
                  pct={s.pct}
                  color={i === 0 ? '#22c55e' : i === 1 ? '#3b82f6' : '#f97316'}
                  maxPct={79}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BEHAVIOR TAB */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          {/* Top Events */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FiMousePointer size={16} className="text-blue-400" /> Top Events
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-800">
                    <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Event Name</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">Event Count</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">% Events</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2">Active Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {topEvents.map((e, i) => (
                    <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                      <td className="py-3 pr-4 text-white text-xs font-mono">{e.event}</td>
                      <td className="py-3 pr-4 text-right text-xs text-navy-200 font-medium">{typeof e.count === 'number' ? e.count.toLocaleString() : e.count}</td>
                      <td className="py-3 pr-4 text-right text-xs text-navy-400">{e.pct}%</td>
                      <td className="py-3 text-right text-xs text-blue-400 font-medium">{typeof e.users === 'number' ? e.users.toLocaleString() : e.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FiEye size={16} className="text-blue-400" /> Top Pages
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-800">
                    <th className="text-left text-xs text-navy-400 font-semibold py-2 pr-4">Page Path</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">Views</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2 pr-4">% Views</th>
                    <th className="text-right text-xs text-navy-400 font-semibold py-2">Active Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {topPages.map((p, i) => (
                    <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                      <td className="py-3 pr-4 text-blue-400 text-xs font-mono">{p.path}</td>
                      <td className="py-3 pr-4 text-right text-xs text-navy-200 font-medium">{p.views.toLocaleString()}</td>
                      <td className="py-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(p.pct / 22.6) * 100}%` }} />
                          </div>
                          <span className="text-xs text-navy-400 w-8 text-right">{p.pct}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-xs text-navy-300 font-medium">{p.users.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 p-4 bg-navy-900/40 border border-navy-800 rounded-xl text-center">
        <p className="text-navy-500 text-xs">
          Data from Google Analytics 4 — MSTI Maritime Academy — Jan 1, 2024 to Sep 21, 2026
        </p>
      </div>
    </div>
  )
}
