import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSave, FiUpload, FiImage, FiCheckCircle, FiAlertCircle, FiRefreshCw, FiEye } from 'react-icons/fi'

const defaultHeroSettings = {
  heroBadge: "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
  heroTitle: "The Premier Maritime Academy in Sri Lanka",
  heroSubtitle: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
  heroBgImage: "/hero-image.jpg",
  heroPrimaryCtaText: "Explore Programs",
  heroPrimaryCtaLink: "/courses",
  heroSecondaryCtaText: "Book a Campus Visit",
  heroSecondaryCtaLink: "/contact",
  aboutBadge: "ABOUT US",
  aboutTitle: "The Premier Maritime Academy in Sri Lanka",
  aboutDesc1: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance.",
  aboutDesc2: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training.",
  aboutLeaderName: "Capt. Ayesha Fernando",
  aboutLeaderRole: "Valedictorian • Officer of the Watch (STCW II/1)",
  aboutLeaderImage: "/captain.jpg",
}

export default function AdminHero() {
  const [formData, setFormData] = useState(defaultHeroSettings)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
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
        setFormData((prev) => ({ ...prev, ...res.data.data }))
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch existing hero settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle direct file upload for Hero Background Image
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

  // Handle direct file upload for About Leader Image
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
        setMsg({ type: 'success', text: 'Hero Section and Website Content updated successfully!' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        <FiRefreshCw className="animate-spin text-blue-500 mr-2" size={24} />
        <span>Loading Hero Section Settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero & Homepage Editor</h1>
          <p className="text-navy-300 text-xs mt-1">
            Control main hero text, badges, CTA buttons, and upload background images.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
        >
          {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave size={16} />}
          {saving ? 'Saving Changes...' : 'Save All Changes'}
        </button>
      </div>

      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2 border ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {msg.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HERO SECTION CARD */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-navy-800 pb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FiImage className="text-blue-400" /> Hero Section Settings
            </h2>
            <span className="text-[10px] text-navy-400 uppercase font-semibold tracking-wider">
              Main Banner
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Badge */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Top Announcement Badge
              </label>
              <input
                type="text"
                name="heroBadge"
                value={formData.heroBadge}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. ⚓ FOUNDING EXCELLENCE SINCE 2002"
              />
            </div>

            {/* Hero Main Headline */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Main Headline Title
              </label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-base font-bold focus:outline-none focus:border-blue-500"
                placeholder="e.g. The Premier Maritime Academy in Sri Lanka"
              />
            </div>

            {/* Hero Subtitle / Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Hero Subtitle / Description Text
              </label>
              <textarea
                rows={3}
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
                placeholder="Enter hero paragraph text..."
              />
            </div>

            {/* HERO IMAGE UPLOAD & PREVIEW */}
            <div className="md:col-span-2 space-y-3 bg-navy-950/60 p-5 border border-navy-800 rounded-xl">
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Hero Background Image (Upload File or Enter URL)
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* File Upload Input Button */}
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-md shrink-0">
                  <FiUpload size={16} />
                  {uploadingHero ? 'Uploading Image...' : 'Upload New Hero Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    disabled={uploadingHero}
                    className="hidden"
                  />
                </label>

                {/* Direct Image URL fallback input */}
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    name="heroBgImage"
                    value={formData.heroBgImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    placeholder="or paste image URL (/hero-image.jpg or https://...)"
                  />
                </div>
              </div>

              {/* Image Live Preview Box */}
              {formData.heroBgImage && (
                <div className="relative mt-3 rounded-xl overflow-hidden border border-navy-700 h-48 bg-navy-950">
                  <img
                    src={formData.heroBgImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000'
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-navy-950/80 backdrop-blur text-white text-[10px] px-2.5 py-1 rounded-md border border-navy-700 flex items-center gap-1">
                    <FiEye size={12} /> Live Preview
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                name="heroPrimaryCtaText"
                value={formData.heroPrimaryCtaText}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Primary Button Link
              </label>
              <input
                type="text"
                name="heroPrimaryCtaLink"
                value={formData.heroPrimaryCtaLink}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Secondary CTA */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                name="heroSecondaryCtaText"
                value={formData.heroSecondaryCtaText}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Secondary Button Link
              </label>
              <input
                type="text"
                name="heroSecondaryCtaLink"
                value={formData.heroSecondaryCtaLink}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ABOUT SECTION & LEADERSHIP CARD */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-navy-800 pb-4">
            <h2 className="text-lg font-bold text-white">About Section & Leadership Spotlight</h2>
            <p className="text-xs text-navy-300">Customize home page about preview content and leadership captain image.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                About Section Title
              </label>
              <input
                type="text"
                name="aboutTitle"
                value={formData.aboutTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                About Description Paragraph 1
              </label>
              <textarea
                rows={3}
                name="aboutDesc1"
                value={formData.aboutDesc1}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                About Description Paragraph 2
              </label>
              <textarea
                rows={3}
                name="aboutDesc2"
                value={formData.aboutDesc2}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Leadership Captain Name & Role */}
            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Leader Name
              </label>
              <input
                type="text"
                name="aboutLeaderName"
                value={formData.aboutLeaderName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-2">
                Leader Title / Role
              </label>
              <input
                type="text"
                name="aboutLeaderRole"
                value={formData.aboutLeaderRole}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Leader Image Upload */}
            <div className="md:col-span-2 space-y-3 bg-navy-950/60 p-5 border border-navy-800 rounded-xl">
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Leader Photo (Upload File or Enter URL)
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-md shrink-0">
                  <FiUpload size={16} />
                  {uploadingAbout ? 'Uploading Image...' : 'Upload Leader Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAboutImageUpload}
                    disabled={uploadingAbout}
                    className="hidden"
                  />
                </label>

                <div className="flex-1 w-full">
                  <input
                    type="text"
                    name="aboutLeaderImage"
                    value={formData.aboutLeaderImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    placeholder="or paste image URL (/captain.jpg or https://...)"
                  />
                </div>
              </div>

              {formData.aboutLeaderImage && (
                <div className="w-32 h-32 rounded-xl overflow-hidden border border-navy-700 mt-2 bg-navy-950">
                  <img
                    src={formData.aboutLeaderImage}
                    alt="Leader Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave size={18} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
