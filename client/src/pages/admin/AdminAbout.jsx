import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FiSave,
  FiUpload,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiInfo,
  FiPlus,
  FiTrash2,
  FiAward,
  FiTarget,
  FiEye,
  FiLayers,
} from 'react-icons/fi'

const defaultAboutSettings = {
  // About Page Hero & Top Stats
  aboutHeroBadge: "About MSTI",
  aboutHeroTitle: "About MSTI — The Flagship Maritime Academy in Sri Lanka",
  aboutHeroSubtitle: "Since our founding, MSTI has been at the forefront of maritime education in Sri Lanka, producing world-class officers and engineers who serve with distinction in the global maritime industry.",
  aboutHeroBgImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600",
  aboutStats: [
    { value: '100+', label: 'Graduates' },
    { value: '150+', label: 'Partners' },
    { value: '18+', label: 'Years' },
    { value: '$4.3M', label: 'Invested' },
  ],

  // About Section & Page Story
  aboutBadge: "ABOUT US",
  aboutTitle: "The Premier Maritime Academy in Sri Lanka",
  aboutDesc1: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance. To do so, we engage in the most suitable solutions in training, assessment, and career development, delivering the best maritime courses Sri Lanka has to offer.",
  aboutDesc2: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training, adhering to strict IMO guidelines and global merchant fleets.",
  aboutMission: "To continuously contribute to the growth of maritime professionals and organizations through world-class IMO-compliant training, cutting-edge bridge simulators, and rigorous seafarer development.",
  aboutVision: "To be recognized globally as Sri Lanka's premier benchmark institution for maritime education, officer cadetship, and merchant marine engineering excellence.",
  aboutHistory: "Founded in 1986, MSTI Maritime Academy is Sri Lanka's pioneer private maritime institute with a distinguished legacy spanning nearly four decades.",
  aboutLeaderName: "Capt. Ayesha Fernando",
  aboutLeaderRole: "Valedictorian • Officer of the Watch (STCW II/1)",
  aboutLeaderImage: "/captain.jpg",
}

export default function AdminAbout() {
  const [formData, setFormData] = useState(defaultAboutSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false)
  const [uploadingLeader, setUploadingLeader] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/settings')
      if (res.data.success && res.data.data) {
        setFormData((prev) => ({
          ...prev,
          ...res.data.data,
          aboutStats:
            res.data.data.aboutStats && res.data.data.aboutStats.length > 0
              ? res.data.data.aboutStats
              : defaultAboutSettings.aboutStats,
        }))
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch existing settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Stats Handlers
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...(formData.aboutStats || defaultAboutSettings.aboutStats)]
    updatedStats[index][field] = value
    setFormData((prev) => ({ ...prev, aboutStats: updatedStats }))
  }

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      aboutStats: [...(prev.aboutStats || defaultAboutSettings.aboutStats), { value: '', label: '' }],
    }))
  }

  const handleRemoveStat = (index) => {
    setFormData((prev) => ({
      ...prev,
      aboutStats: (prev.aboutStats || defaultAboutSettings.aboutStats).filter((_, i) => i !== index),
    }))
  }

  // File Upload Handlers
  const handleHeroBgUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingHeroBg(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, aboutHeroBgImage: res.data.imageUrl }))
        setMsg({ type: 'success', text: 'About hero background image uploaded successfully!' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload image' })
    } finally {
      setUploadingHeroBg(false)
    }
  }

  const handleLeaderImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingLeader(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, aboutLeaderImage: res.data.imageUrl }))
        setMsg({ type: 'success', text: 'Leader image uploaded successfully!' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload image' })
    } finally {
      setUploadingLeader(false)
    }
  }

  // Save Settings
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg({ type: '', text: '' })

    try {
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.put('/api/settings', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success) {
        setMsg({ type: 'success', text: 'About Page & Content saved successfully! 🚢' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FiInfo className="text-blue-500" /> About Page & Content Management
          </h1>
          <p className="text-xs text-navy-400 mt-1">
            Customize the About Page Hero banner, key statistics counters, academy story, vision, mission, history, and leadership.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
          {saving ? 'Saving Changes...' : 'Save About Page'}
        </button>
      </div>

      {/* Status Message */}
      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {msg.type === 'success' ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: ABOUT PAGE TOP HERO & KEY METRICS */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FiLayers className="text-blue-400" /> 1. About Page Hero Banner & Statistics
            </h2>
            <span className="text-[11px] text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
              Live on /about
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Badge Text</label>
                <input
                  type="text"
                  name="aboutHeroBadge"
                  value={formData.aboutHeroBadge || ''}
                  onChange={handleChange}
                  placeholder="About MSTI"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Main Heading</label>
                <input
                  type="text"
                  name="aboutHeroTitle"
                  value={formData.aboutHeroTitle || ''}
                  onChange={handleChange}
                  placeholder="About MSTI — The Flagship Maritime Academy in Sri Lanka"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Subtitle / Description</label>
              <textarea
                name="aboutHeroSubtitle"
                rows={3}
                value={formData.aboutHeroSubtitle || ''}
                onChange={handleChange}
                placeholder="Since our founding, MSTI has been at the forefront..."
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Background Image */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Background Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="aboutHeroBgImage"
                  value={formData.aboutHeroBgImage || ''}
                  onChange={handleChange}
                  className="flex-1 bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <label className="bg-navy-800 hover:bg-navy-750 text-white font-medium text-xs py-2.5 px-4 rounded-xl border border-navy-700 cursor-pointer flex items-center gap-2 shrink-0">
                  <FiUpload /> {uploadingHeroBg ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleHeroBgUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Key Statistics Counters */}
            <div className="pt-4 border-t border-navy-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    📊 Key Statistics Counters (100+ Graduates, etc.)
                  </h3>
                  <p className="text-[11px] text-navy-400 mt-0.5">
                    Customize the 4 metric numbers and labels shown below the banner
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddStat}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <FiPlus size={13} /> Add Stat Card
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(formData.aboutStats || defaultAboutSettings.aboutStats).map((stat, idx) => (
                  <div key={idx} className="bg-navy-950 border border-navy-800 rounded-xl p-3 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-400">Stat #{idx + 1}</span>
                      {(formData.aboutStats || defaultAboutSettings.aboutStats).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStat(idx)}
                          className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                          title="Delete Stat"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] text-navy-400 mb-0.5">Value (e.g. 100+, 18+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                        className="w-full bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-navy-400 mb-0.5">Label (e.g. Graduates)</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                        className="w-full bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: STORY & OVERVIEW */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-3 flex items-center gap-2">
            <FiAward className="text-amber-400" /> 2. Our Story & Overview Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Section Badge</label>
                <input
                  type="text"
                  name="aboutBadge"
                  value={formData.aboutBadge || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Section Heading Title</label>
                <input
                  type="text"
                  name="aboutTitle"
                  value={formData.aboutTitle || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1">Story Paragraph 1</label>
              <textarea
                name="aboutDesc1"
                rows={3}
                value={formData.aboutDesc1 || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1">Story Paragraph 2</label>
              <textarea
                name="aboutDesc2"
                rows={3}
                value={formData.aboutDesc2 || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
                  <FiTarget size={14} /> Academy Mission
                </label>
                <textarea
                  name="aboutMission"
                  rows={3}
                  value={formData.aboutMission || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                  <FiEye size={14} /> Academy Vision
                </label>
                <textarea
                  name="aboutVision"
                  rows={3}
                  value={formData.aboutVision || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>
            </div>

            {/* History */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 mb-1">History & Founding Legacy</label>
              <textarea
                name="aboutHistory"
                rows={2}
                value={formData.aboutHistory || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Leader Details */}
            <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-3 pt-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Featured Leadership / Principal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Leader Name</label>
                  <input
                    type="text"
                    name="aboutLeaderName"
                    value={formData.aboutLeaderName || ''}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Leader Role / Rank</label>
                  <input
                    type="text"
                    name="aboutLeaderRole"
                    value={formData.aboutLeaderRole || ''}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-navy-400 mb-1">Leader Image Path / URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    name="aboutLeaderImage"
                    value={formData.aboutLeaderImage || ''}
                    onChange={handleChange}
                    className="flex-1 bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <label className="bg-navy-800 hover:bg-navy-750 text-white text-xs py-2 px-3 rounded-lg border border-navy-700 cursor-pointer flex items-center gap-1.5 shrink-0">
                    <FiUpload size={13} /> {uploadingLeader ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleLeaderImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
            {saving ? 'Saving Changes...' : 'Save All About Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
