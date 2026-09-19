import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSave, FiUpload, FiImage, FiCheckCircle, FiAlertCircle, FiRefreshCw, FiSliders, FiInfo, FiPhone, FiHelpCircle, FiPlus, FiTrash2 } from 'react-icons/fi'

const defaultSettings = {
  // Hero
  heroBadge: "⚓ FOUNDING EXCELLENCE SINCE 1986 • SRI LANKA'S PREMIER CADET CORPS",
  heroTitle: "The Premier Maritime Academy in Sri Lanka",
  heroSubtitle: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
  heroBgImage: "/hero-image.jpg",
  heroPrimaryCtaText: "Explore Programs",
  heroPrimaryCtaLink: "/courses",
  heroSecondaryCtaText: "Book a Campus Visit",
  heroSecondaryCtaLink: "/contact",

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

  // About Section & Page
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

  // Contact Info & Campus Branches
  contactAddress: "No. 32, Station Road, Dehiwala 10350, Sri Lanka",
  contactPhone: "+94 11 747 6100",
  contactEmail: "helpdesk@msti.lk",
  contactHours: "Mon–Fri 8:30 AM – 5:30 PM",
  kalutaraSouthAddress: "No. 25, St. Sebastian Road, Kalutara South, Sri Lanka",
  kalutaraNorthAddress: "Mirishenawatta, Ethanamadala, Kalutara North, Sri Lanka",

  // FAQs
  faqs: [
    {
      q: 'What are the minimum academic requirements for the Officer Cadetship Programme?',
      a: 'Applicants must have a minimum of GCE A/L qualification. While a science background is preferred, arts and commerce students are also eligible. English language proficiency is mandatory.',
    },
    {
      q: 'Is there a maximum age limit for applying to MSTI?',
      a: 'Yes. For the Officer Cadetship and Marine Engineering Cadetship programmes, applicants must be between 17 and 25 years of age at the time of application. Short courses and professional development programmes have no age restrictions.',
    },
    {
      q: 'Does MSTI guarantee employment after graduation?',
      a: 'MSTI has signed placement agreements with over 150 international shipping companies. All qualifying graduates from our flagship cadetship programmes are offered employment through our placement partners.',
    },
  ],
}

export default function AdminHero() {
  const [formData, setFormData] = useState(defaultSettings)
  const [activeTab, setActiveTab] = useState('hero') // 'hero' | 'about' | 'contact' | 'faqs'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [uploadingAboutHero, setUploadingAboutHero] = useState(false)
  const [uploadingAbout, setUploadingAbout] = useState(false)
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
          aboutStats: (res.data.data.aboutStats && res.data.data.aboutStats.length > 0) ? res.data.data.aboutStats : defaultSettings.aboutStats,
          faqs: (res.data.data.faqs && res.data.data.faqs.length > 0) ? res.data.data.faqs : defaultSettings.faqs,
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

  // About Stats Handlers
  const handleAboutStatChange = (index, field, value) => {
    const updatedStats = [...(formData.aboutStats || defaultSettings.aboutStats)]
    updatedStats[index][field] = value
    setFormData((prev) => ({ ...prev, aboutStats: updatedStats }))
  }

  const handleAddAboutStat = () => {
    setFormData((prev) => ({
      ...prev,
      aboutStats: [...(prev.aboutStats || defaultSettings.aboutStats), { value: '', label: '' }],
    }))
  }

  const handleRemoveAboutStat = (index) => {
    setFormData((prev) => ({
      ...prev,
      aboutStats: (prev.aboutStats || defaultSettings.aboutStats).filter((_, i) => i !== index),
    }))
  }

  // FAQ Handlers
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs]
    updatedFaqs[index][field] = value
    setFormData((prev) => ({ ...prev, faqs: updatedFaqs }))
  }

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: '', a: '' }],
    }))
  }

  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }

  // File Upload Handlers
  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingHero(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, heroBgImage: res.data.imageUrl }))
        setMsg({ type: 'success', text: 'Hero background image uploaded successfully!' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload image' })
    } finally {
      setUploadingHero(false)
    }
  }

  const handleAboutHeroImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingAboutHero(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, aboutHeroBgImage: res.data.imageUrl }))
        setMsg({ type: 'success', text: 'About hero image uploaded successfully!' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload image' })
    } finally {
      setUploadingAboutHero(false)
    }
  }

  const handleAboutImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingAbout(true)
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
      setUploadingAbout(false)
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
        setMsg({ type: 'success', text: 'Website settings saved and updated live successfully! 🚢' })
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
            <FiSliders className="text-blue-500" /> Website Content & Sections Editor
          </h1>
          <p className="text-xs text-navy-400 mt-1">
            Customize Home Hero, About Us history, Campus Branches, Contact information, and FAQs across the live site.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
          {saving ? 'Saving Changes...' : 'Save All Changes'}
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

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
        {[
          { id: 'hero', label: 'Hero Section', icon: FiSliders },
          { id: 'about', label: 'About Us Section & Page', icon: FiInfo },
          { id: 'contact', label: 'Contact Info & Branches', icon: FiPhone },
          { id: 'faqs', label: 'FAQs Management', icon: FiHelpCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-navy-900 text-navy-400 hover:text-white hover:bg-navy-850'
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-3">
              🏠 Homepage Hero Header & CTA Buttons
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Top Badge Text</label>
                <input
                  type="text"
                  name="heroBadge"
                  value={formData.heroBadge}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Main Title (Heading)</label>
                <input
                  type="text"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Subtitle (Paragraph)</label>
                <textarea
                  name="heroSubtitle"
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              {/* Call to Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold text-blue-400">Primary CTA Button</h3>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Button Text</label>
                    <input
                      type="text"
                      name="heroPrimaryCtaText"
                      value={formData.heroPrimaryCtaText}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Button Target Link</label>
                    <input
                      type="text"
                      name="heroPrimaryCtaLink"
                      value={formData.heroPrimaryCtaLink}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold text-amber-400">Secondary CTA Button</h3>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Button Text</label>
                    <input
                      type="text"
                      name="heroSecondaryCtaText"
                      value={formData.heroSecondaryCtaText}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Button Target Link</label>
                    <input
                      type="text"
                      name="heroSecondaryCtaLink"
                      value={formData.heroSecondaryCtaLink}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Background Image */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-navy-200 mb-1">Hero Background Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    name="heroBgImage"
                    value={formData.heroBgImage}
                    onChange={handleChange}
                    className="flex-1 bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <label className="bg-navy-800 hover:bg-navy-750 text-white font-medium text-xs py-2.5 px-4 rounded-xl border border-navy-700 cursor-pointer flex items-center gap-2 shrink-0">
                    <FiUpload /> {uploadingHero ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT US SECTION & PAGE */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* About Page Hero Banner & Stats */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-3 flex items-center justify-between">
                <span>🌟 About Page Hero Banner & Statistics Counters</span>
                <span className="text-[11px] text-blue-400 font-normal normal-case">Controls /about page top section</span>
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-200 mb-1">About Page Hero Badge</label>
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
                    <label className="block text-xs font-semibold text-navy-200 mb-1">About Page Hero Main Title</label>
                    <input
                      type="text"
                      name="aboutHeroTitle"
                      value={formData.aboutHeroTitle || ''}
                      onChange={handleChange}
                      placeholder="About MSTI — The Flagship Maritime Academy in Sri Lanka"
                      className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">About Page Hero Subtitle / Intro</label>
                  <textarea
                    name="aboutHeroSubtitle"
                    rows={3}
                    value={formData.aboutHeroSubtitle || ''}
                    onChange={handleChange}
                    placeholder="Since our founding, MSTI has been at the forefront..."
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                {/* About Hero Background Image */}
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">About Page Hero Background Image</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="aboutHeroBgImage"
                      value={formData.aboutHeroBgImage || ''}
                      onChange={handleChange}
                      className="flex-1 bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="bg-navy-800 hover:bg-navy-750 text-white font-medium text-xs py-2.5 px-4 rounded-xl border border-navy-700 cursor-pointer flex items-center gap-2 shrink-0">
                      <FiUpload /> {uploadingAboutHero ? 'Uploading...' : 'Upload Image'}
                      <input type="file" accept="image/*" onChange={handleAboutHeroImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* About Page Stats Counters */}
                <div className="pt-3 border-t border-navy-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">📊 Key Statistics Counters (100+ Graduates, etc.)</h3>
                      <p className="text-[11px] text-navy-400 mt-0.5">Customize the metric numbers and labels shown below the About Hero banner</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddAboutStat}
                      className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <FiPlus size={13} /> Add Stat Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(formData.aboutStats || defaultSettings.aboutStats).map((stat, idx) => (
                      <div key={idx} className="bg-navy-950 border border-navy-800 rounded-xl p-3 relative space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-blue-400">Stat #{idx + 1}</span>
                          {(formData.aboutStats || defaultSettings.aboutStats).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAboutStat(idx)}
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
                            onChange={(e) => handleAboutStatChange(idx, 'value', e.target.value)}
                            className="w-full bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-navy-400 mb-0.5">Label (e.g. Graduates)</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleAboutStatChange(idx, 'label', e.target.value)}
                            className="w-full bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Us Overview, Mission & Vision */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-3">
                ℹ️ About Us Overview, Mission & Vision
              </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">About Section Badge</label>
                  <input
                    type="text"
                    name="aboutBadge"
                    value={formData.aboutBadge}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">About Section Title</label>
                  <input
                    type="text"
                    name="aboutTitle"
                    value={formData.aboutTitle}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Overview Paragraph 1</label>
                <textarea
                  name="aboutDesc1"
                  rows={3}
                  value={formData.aboutDesc1}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 mb-1">Overview Paragraph 2</label>
                <textarea
                  name="aboutDesc2"
                  rows={3}
                  value={formData.aboutDesc2}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-blue-400 mb-1">Academy Mission</label>
                  <textarea
                    name="aboutMission"
                    rows={3}
                    value={formData.aboutMission}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-400 mb-1">Academy Vision</label>
                  <textarea
                    name="aboutVision"
                    rows={3}
                    value={formData.aboutVision}
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
                  value={formData.aboutHistory}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              {/* Leader Details */}
              <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-3 pt-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Featured Leadership / Principal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Leader Name</label>
                    <input
                      type="text"
                      name="aboutLeaderName"
                      value={formData.aboutLeaderName}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Leader Role / Rank</label>
                    <input
                      type="text"
                      name="aboutLeaderRole"
                      value={formData.aboutLeaderRole}
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
                      value={formData.aboutLeaderImage}
                      onChange={handleChange}
                      className="flex-1 bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="bg-navy-800 hover:bg-navy-750 text-white text-xs py-2 px-3 rounded-lg border border-navy-700 cursor-pointer flex items-center gap-1.5 shrink-0">
                      <FiUpload size={13} /> {uploadingAbout ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleAboutImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT INFO & CAMPUS BRANCHES */}
        {activeTab === 'contact' && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-3">
              📞 Contact Information & Campus Locations
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">Official Hotline / Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">Official Helpdesk Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-200 mb-1">Working Hours</label>
                  <input
                    type="text"
                    name="contactHours"
                    value={formData.contactHours}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Campus Addresses */}
              <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Campus & Training Center Locations
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    MSTI Dehiwala - Main Branch Address
                  </label>
                  <input
                    type="text"
                    name="contactAddress"
                    value={formData.contactAddress}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Kalutara South Training Center Address
                  </label>
                  <input
                    type="text"
                    name="kalutaraSouthAddress"
                    value={formData.kalutaraSouthAddress}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Kalutara North Training Center Address
                  </label>
                  <input
                    type="text"
                    name="kalutaraNorthAddress"
                    value={formData.kalutaraNorthAddress}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS MANAGEMENT */}
        {activeTab === 'faqs' && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                ❓ Frequently Asked Questions (FAQs)
              </h2>
              <button
                type="button"
                onClick={handleAddFaq}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <FiPlus size={14} /> Add New FAQ
              </button>
            </div>

            <div className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-navy-950 border border-navy-800 rounded-xl space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">FAQ #{index + 1}</span>
                    {formData.faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(index)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-navy-900 transition-colors"
                        title="Delete Question"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Question</label>
                    <input
                      type="text"
                      placeholder="e.g. What are the minimum academic requirements?"
                      value={faq.q}
                      onChange={(e) => handleFaqChange(index, 'q', e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Answer</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Applicants must have GCE A/L..."
                      value={faq.a}
                      onChange={(e) => handleFaqChange(index, 'a', e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
            {saving ? 'Saving Changes...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
