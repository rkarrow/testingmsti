import { useState } from 'react'
import axios from 'axios'
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiSend, FiCheckCircle } from 'react-icons/fi'
import CTASection from '../components/CTASection'

const stats = [
  { value: '100%', label: 'Response Rate' },
  { value: '150+', label: 'Hiring Partners' },
  { value: '< 24h', label: 'Response Time' },
  { value: 'IMO', label: 'Accredited' },
]

const faqs = [
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
  {
    q: 'How long does the application process take?',
    a: 'The standard application review process takes approximately 2–3 weeks. Shortlisted candidates will be invited for an aptitude test, medical examination, and interview. The entire selection process takes 4–6 weeks.',
  },
  {
    q: 'Are there any scholarship or financial aid options available?',
    a: 'Yes. MSTI offers merit-based scholarships covering up to 50% of tuition fees for academically outstanding students. Additionally, several government and private sector bursary schemes are available for eligible candidates.',
  },
  {
    q: 'Can international students apply to MSTI programmes?',
    a: 'Yes. MSTI welcomes applications from international students, particularly from South Asian and Indian Ocean Rim countries. International students must meet the same academic and medical standards as domestic applicants.',
  },
]

const contactInfo = [
  {
    icon: FiMapPin,
    label: 'Campus Address',
    value: 'MSTI Campus, Colombo Port Area, Colombo 01, Sri Lanka',
    sub: 'Near Colombo South Harbour Terminal',
  },
  {
    icon: FiPhone,
    label: 'Telephone',
    value: '+94 11 234 5678',
    sub: 'Mon–Fri 8:30 AM – 5:30 PM',
  },
  {
    icon: FiMail,
    label: 'Email',
    value: 'admissions@msti.lk',
    sub: 'We respond within 24 hours',
  },
  {
    icon: FiClock,
    label: 'Office Hours',
    value: 'Mon – Fri: 8:30 AM – 5:30 PM',
    sub: 'Sat: 9:00 AM – 1:00 PM',
  },
]

const enquiryTypes = ['Pre-Admissions', 'Course Information', 'General Enquiry', 'Medical Standards', 'Other']

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', enquiryType: 'Pre-Admissions',
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })
  const [openFaq, setOpenFaq] = useState(null)

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
    <div className="pt-[72px]">
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
            {stats.map((s, i) => (
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
              <div className="badge-blue mb-4">Our Office</div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch Directly</h2>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4 bg-navy-900 border border-navy-700 rounded-xl p-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-blue-400" size={18} />
                    </div>
                    <div>
                      <p className="text-navy-400 text-xs font-medium uppercase tracking-wider mb-0.5">{info.label}</p>
                      <p className="text-white text-sm font-medium">{info.value}</p>
                      {info.sub && <p className="text-navy-500 text-xs mt-0.5">{info.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotlines */}
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5 mb-6">
                <p className="text-blue-400 font-semibold text-sm mb-4">📞 Direct Hotlines</p>
                <div className="space-y-3">
                  {[
                    { label: 'Admissions Hotline', value: '+94 77 123 4567' },
                    { label: 'Course Information', value: '+94 77 234 5678' },
                    { label: 'Emergency Contact', value: '+94 11 345 6789' },
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-navy-400 text-sm">{h.label}</span>
                      <a href={`tel:${h.value.replace(/\s/g,'')}`} className="text-white font-semibold text-sm hover:text-blue-400 transition-colors">
                        {h.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-0 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="badge-blue mb-4">Location</div>
          <h2 className="text-2xl font-bold text-white mb-6">Port Strategic Access</h2>
          <div className="rounded-2xl overflow-hidden border border-navy-700 h-80">
            <iframe
              title="MSTI Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9831225899!2d79.8430!3d6.9319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963120b1509%3A0x2db2c18a68712863!2sColombo%20Port!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* GALLERY - REGIMENTED ACADEMIC SPLENDOR */}
      <section className="py-16 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="badge-blue mb-3 mx-auto">Campus Life</div>
            <h2 className="text-2xl font-bold text-white">Regimented Academic Splendor</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
              'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400',
              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
              'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400',
              'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400',
              'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=400',
              'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400',
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl h-32 md:h-40 group cursor-pointer">
                <img
                  src={src}
                  alt={`Campus ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
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
            {faqs.map((faq, i) => (
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
