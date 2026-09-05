import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiBookOpen, FiFileText, FiMail, FiSliders, FiArrowRight, FiCheckCircle, FiUploadCloud } from 'react-icons/fi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, news: 0, inquiries: 0 })
  const [loading, setLoading] = useState(true)
  const [heroTitle, setHeroTitle] = useState('')

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem('msti_admin_token')
        const authHeader = { headers: { Authorization: `Bearer ${token}` } }

        const [cRes, nRes, inqRes, setRes] = await Promise.all([
          axios.get('/api/courses?includeInactive=true'),
          axios.get('/api/news'),
          axios.get('/api/contact', authHeader).catch(() => ({ data: { count: 0 } })),
          axios.get('/api/settings'),
        ])

        setStats({
          courses: cRes.data?.count || cRes.data?.data?.length || 0,
          news: nRes.data?.count || nRes.data?.data?.length || 0,
          inquiries: inqRes.data?.count || inqRes.data?.data?.length || 0,
        })

        if (setRes.data?.data?.heroTitle) {
          setHeroTitle(setRes.data.data.heroTitle)
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOverview()
  }, [])

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-navy-900 to-navy-900 border border-blue-500/20 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Welcome to Admin Console
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">
            MSTI Website Management Dashboard
          </h1>
          <p className="text-navy-200 text-sm leading-relaxed mb-6">
            Easily update Hero section texts and images, manage cadet courses, post news releases, and respond to incoming admissions enquiries.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/hero"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
            >
              <FiSliders /> Edit Hero Section & Images
            </Link>
            <Link
              to="/admin/courses"
              className="bg-navy-800 hover:bg-navy-700 border border-navy-700 text-white font-semibold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <FiBookOpen /> Add / Manage Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-navy-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Active Courses
            </div>
            <div className="text-3xl font-extrabold text-white">
              {loading ? '...' : stats.courses}
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <FiCheckCircle /> Live on website
            </p>
          </div>
          <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
            <FiBookOpen size={26} />
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-navy-400 text-xs font-semibold uppercase tracking-wider mb-1">
              News & Articles
            </div>
            <div className="text-3xl font-extrabold text-white">
              {loading ? '...' : stats.news}
            </div>
            <p className="text-[11px] text-blue-400 mt-2 flex items-center gap-1">
              <FiCheckCircle /> Published dispatches
            </p>
          </div>
          <div className="w-14 h-14 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
            <FiFileText size={26} />
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-navy-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Contact Inquiries
            </div>
            <div className="text-3xl font-extrabold text-white">
              {loading ? '...' : stats.inquiries}
            </div>
            <p className="text-[11px] text-purple-400 mt-2 flex items-center gap-1">
              <FiMail /> User submissions
            </p>
          </div>
          <div className="w-14 h-14 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center">
            <FiMail size={26} />
          </div>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Management Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <Link
            to="/admin/hero"
            className="group bg-navy-900 hover:bg-navy-850 border border-navy-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                  <FiSliders size={20} />
                </div>
                <span className="text-navy-400 group-hover:text-blue-400 transition-colors">
                  <FiArrowRight size={20} />
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Hero Section & Images</h3>
              <p className="text-xs text-navy-300 leading-relaxed">
                Change Hero title, description, buttons, and upload custom background hero images dynamically.
              </p>
            </div>
            {heroTitle && (
              <div className="mt-4 pt-4 border-t border-navy-800 text-[11px] text-navy-400">
                Current Headline: <span className="text-white italic font-medium">"{heroTitle}"</span>
              </div>
            )}
          </Link>

          {/* Card 2 */}
          <Link
            to="/admin/courses"
            className="group bg-navy-900 hover:bg-navy-850 border border-navy-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
                  <FiBookOpen size={20} />
                </div>
                <span className="text-navy-400 group-hover:text-emerald-400 transition-colors">
                  <FiArrowRight size={20} />
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Courses & Training Programs</h3>
              <p className="text-xs text-navy-300 leading-relaxed">
                Add new cadetship programs, update course durations, entry requirements, and upload banner photos.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-navy-800 text-[11px] text-navy-400 flex items-center gap-2">
              <FiUploadCloud size={14} className="text-emerald-400" /> Image upload enabled for every course
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
