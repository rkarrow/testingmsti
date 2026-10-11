import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiSend, FiCheckCircle, FiShield } from 'react-icons/fi'
import CTASection from '../components/CTASection'

const defaultStats = [
  { value: '100%', label: 'Response Rate' },
  { value: '150+', label: 'Hiring Partners' },
  { value: '< 24h', label: 'Response Time' },
  { value: 'IMO', label: 'Accredited' },
]

const defaultFaqs = [
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
]

const enquiryTypes = ['Pre-Admissions', 'Course Information', 'General Enquiry', 'Medical Standards', 'Other']

export default function Contact() {
  const [settings, setSettings] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', enquiryType: 'Pre-Admissions',
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings')
        if (res.data.success && res.data.data) {
          setSettings(res.data.data)
        }
      } catch (e) {
        // use fallback
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, success: true, error: '' })
      setForm({ name: '', email: '', phone: '', subject: '', message: '', enquiryType: 'Pre-Admissions' })
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to send message. Please try again.',
      })
    }
  }

  return (
    <div className="pt-[96px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=1600"
            alt="Contact MSTI"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="badge-blue mb-4">Get in Touch</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Contact Us & Admissions Office
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              Our admissions team is ready to guide you through the application process. Reach out with any questions about our programmes, requirements, or career pathways.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {defaultStats.map((s, i) => (
              <div key={i} className="bg-navy-900/70 border border-navy-700 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-navy-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="badge-blue mb-4">Send a Message</div>
              <h2 className="text-2xl font-bold text-white mb-6">Pre-Admissions Enquiry</h2>

              {status.success ? (
                <div className="bg-green-600/10 border border-green-500/30 rounded-2xl p-8 text-center">
                  <FiCheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-white font-bold text-xl mb-2">Enquiry Submitted!</h3>
                  <p className="text-navy-400">
                    Thank you for reaching out. Our admissions team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus({ loading: false, success: false, error: '' })}
                    className="btn-primary mt-6"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Enquiry type */}
                  <div>
                    <label className="block text-navy-300 text-sm font-medium mb-2">Enquiry Type</label>
                    <div className="flex flex-wrap gap-2">
                      {enquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, enquiryType: type }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            form.enquiryType === type
                              ? 'bg-blue-600 text-white'
                              : 'bg-navy-800 text-navy-300 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-300 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-300 text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-300 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-navy-300 text-sm font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="Subject of enquiry"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy-300 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your interest in MSTI, any specific questions, or your background..."
                      className="input-field resize-none"
                    />
                  </div>

                  {status.error && (
                    <div className="bg-red-600/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                      {status.error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.loading}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend /> Submit Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <div className="badge-blue mb-4">Our Locations & Hotlines</div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch Directly</h2>

              <div className="space-y-4 mb-8">
                {/* Dehiwala Main */}
                <div className="flex items-start gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <p className="text-navy-400 text-xs font-medium uppercase tracking-wider mb-0.5">
                      MSTI Dehiwala - Main Branch
                    </p>
                    <p className="text-white text-sm font-medium">
                      {settings?.contactAddress || 'No. 32, Station Road, Dehiwala 10350, Sri Lanka'}
                    </p>
                  </div>
                </div>

                {/* Kalutara South */}
                <div className="flex items-start gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <p className="text-navy-400 text-xs font-medium uppercase tracking-wider mb-0.5">
                      Kalutara South Training Center
                    </p>
                    <p className="text-white text-sm font-medium">
                      {settings?.kalutaraSouthAddress || 'No. 25, St. Sebastian Road, Kalutara South, Sri Lanka'}
                    </p>
                  </div>
                </div>

                {/* Kalutara North */}
                <div className="flex items-start gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <p className="text-navy-400 text-xs font-medium uppercase tracking-wider mb-0.5">
                      Kalutara North Training Center
                    </p>
                    <p className="text-white text-sm font-medium">
                      {settings?.kalutaraNorthAddress || 'Mirishenawatta, Ethanamadala, Kalutara North, Sri Lanka'}
                    </p>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-navy-900 border border-navy-700 rounded-xl p-3.5">
                    <FiPhone className="text-blue-400 mt-1" size={16} />
                    <div>
                      <p className="text-navy-400 text-[10px] uppercase font-bold">Hotline</p>
                      <a href={`tel:${settings?.contactPhone || '+94117476100'}`} className="text-white text-xs font-semibold hover:text-blue-400 transition-colors">
                        {settings?.contactPhone || '+94 11 747 6100'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-navy-900 border border-navy-700 rounded-xl p-3.5">
                    <FiMail className="text-blue-400 mt-1" size={16} />
                    <div>
                      <p className="text-navy-400 text-[10px] uppercase font-bold">Helpdesk</p>
                      <a href={`mailto:${settings?.contactEmail || 'helpdesk@msti.lk'}`} className="text-white text-xs font-semibold hover:text-blue-400 transition-colors">
                        {settings?.contactEmail || 'helpdesk@msti.lk'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Official Social Media Channels - Corporate Styling */}
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 mt-4">
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Official Digital Channels
                  </p>
                  <p className="text-navy-400 text-xs mb-3">
                    Connect with MSTI Maritime Academy on official social platforms for batch intakes and announcements:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <a
                      href="https://youtube.com/@mstimaritimeacademy?si=pXilsRZIagsjp4O7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-navy-950 border border-navy-800 hover:border-[#FF0000]/60 hover:bg-[#FF0000]/10 text-navy-300 hover:text-white text-xs font-medium transition-all group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#FF0000] shrink-0" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                    </a>
                    <a
                      href="https://www.facebook.com/MercmarineTraining/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-navy-950 border border-navy-800 hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 text-navy-300 hover:text-white text-xs font-medium transition-all group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#1877F2] shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/mstimaritimeacademy/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-navy-950 border border-navy-800 hover:border-[#E4405F]/60 hover:bg-[#E4405F]/10 text-navy-300 hover:text-white text-xs font-medium transition-all group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#E4405F] shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://lk.linkedin.com/school/mstimaritimeacademysl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-navy-950 border border-navy-800 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 text-navy-300 hover:text-white text-xs font-medium transition-all group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#0A66C2] shrink-0" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@mediamsti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-navy-950 border border-navy-800 hover:border-white/60 hover:bg-white/10 text-navy-300 hover:text-white text-xs font-medium transition-all group"
                    >
                      <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <span>TikTok</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="badge-blue mb-3 mx-auto">Common Questions</div>
            <h2 className="text-3xl font-bold text-white">Admissions & Cadet FAQs</h2>
          </div>
          <div className="space-y-3">
            {(settings?.faqs && settings.faqs.length > 0 ? settings.faqs : defaultFaqs).map((faq, i) => (
              <div key={i} className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <FiChevronUp className="text-blue-400 flex-shrink-0" size={18} />
                  ) : (
                    <FiChevronDown className="text-navy-400 flex-shrink-0" size={18} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-navy-800 pt-4">
                    <p className="text-navy-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Chart Your Naval Career?"
        subtitle="Take the first step toward a world-class maritime career. Apply today."
        primaryLabel="Submit Application"
        primaryTo="/contact"
        secondaryLabel="Learn More"
        secondaryTo="/courses"
      />
    </div>
  )
}
