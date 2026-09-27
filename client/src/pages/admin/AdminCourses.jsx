import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiBookOpen,
  FiImage,
  FiStar,
  FiAnchor,
  FiAward,
  FiSave,
  FiLayers,
  FiSliders,
} from 'react-icons/fi'

const defaultOfficerCadetPrograms = [
  {
    title: 'Navigation Officer Cadet',
    category: 'Deck Department',
    duration: '24 Months',
    overview:
      "The life of a navigation officer cadet or deck cadet is adventurous and rewarding. When in charge of the navigational watch one must undertake responsibilities while also being a trustworthy individual. It is undoubtedly the ideal learning experience in seafaring and marine engineering in Sri Lanka, which is an essential step in a cadet's journey towards becoming a Ship's Captain.\n\nIn addition to the prospect of adventure at sea, a navigation officer cadet will receive an attractive tax-free remuneration in US dollars. As work is assigned on a contractual basis, cadets taking seaman courses can also maintain a healthy work-life balance while planning a productive retirement.",
    journey: [
      'Phase I — Residential, shore-based training (6 months)',
      'Phase II — On-board training (12 months)',
      'Phase III — Preparatory course for Officer in Charge of a Navigational Watch, Class III (6 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the relevant Technology-stream "S" pass combinations specified by DGMS',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome:
      'On completing the programme and the ministry exam, cadets qualify to sail as Third Officer on foreign-going ships.',
    careerSea: 'Third Officer → Second Officer → Chief Officer → Captain',
    careerAshore:
      'Harbour Pilot, Marine Superintendent, Shipping Administrator, Port State Controller, Harbour Master, Crew Manager, Maritime Educator',
  },
  {
    title: 'Engineering Officer Cadet',
    category: 'Engine Propulsion',
    duration: '36 Months',
    overview:
      "A trained marine engineering officer must ensure the smooth operation of the ship's propulsion plants and support systems during the entire seafaring process. Experiencing career growth, an engineering officer is also offered excellent tax-free remuneration at an early stage of the career. As in the case of a navigation officer, an engineering officer will also work on a contract basis which makes it easier to plan work and family life.",
    journey: [
      'Phase I — Residential, shore-based training at the Institute (12 months)',
      'Phase II — Industrial training (9 months)',
      'Phase III — Onboard training (12 months)',
      'Phase IV — Preparatory course for Officer in Charge of an Engineering Watch, Class III (4 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the equivalent Technology-stream "S" pass combinations',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome:
      'On completing the programme and the ministry exam, cadets receive a Class III certificate of competency, qualifying them to serve as Third or Fourth Engineer on a foreign-going ship.',
    careerSea: 'Fourth Engineer → Third Engineer → Second Engineer → Chief Engineer',
    careerAshore:
      'Maintenance Engineer (star-class hotels), Ships & Industrial Surveyor, Technical Superintendent, Maritime Educator, Ship Repairs/Construction',
  },
]

const defaultRatingPrograms = [
  {
    title: 'Deck Rating',
    category: 'Pre-Sea General',
    duration: '9 Months',
    overview:
      'Working on the deck while seafaring requires continuous vigilance. Ensuring the protection of the cargo, and carrying out navigational, security and maintenance work are also areas that will be perfected at the end of the best rating training course in Sri Lanka.',
    requirements:
      '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath: 'Ordinary Seaman at sea, progressing with experience and qualification toward Captain.',
  },
  {
    title: 'Engine Rating',
    category: 'Engine Support',
    duration: '9 Months',
    overview:
      'Upon completion of this course, participants will gain the ability to single-handedly and collectively manage maintenance work in the engine room and on board a ship while seafaring... and assist the marine engineers.',
    requirements:
      '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath:
      'Engine Rating, with the potential to progress toward Chief Engineer with training and dedication.',
  },
  {
    title: 'Electro-Technical Rating (ETR)',
    category: 'Electrical & Automation',
    duration: '6 Months',
    overview:
      'The Electro-Technical Rating Programme equips candidates with the technical knowledge and hands-on skills required to serve as Electro-Technical Ratings aboard modern merchant vessels, meeting current STCW requirements for electrical, electronic, instrumentation and control systems.',
    requirements:
      'GCE O/L passes; minimum age 18; medical fitness and eyesight (including colour vision) per STCW; interview if required.',
    careerPath:
      'Trainee Electro-Technical Rating → Electrical/Instrumentation Maintenance Technician, ship-repair or marine power-generation roles → with experience, advancement toward Electro-Technical Officer.',
  },
  {
    title: 'Catering Rating',
    category: 'Maritime Hospitality',
    duration: '6 Months',
    overview:
      'Specialized training for those interested in joining the maritime hospitality sector. Practical training is offered at a partner star-class hotel.',
    requirements: 'GCE O/L passes; minimum age 18; demonstrated medical fitness.',
    careerPath: 'Catering Rating Programme → theory and practical training at a star-class hotel → Cook.',
  },
]

const defaultShortCourses = {
  stcw: [
    'AFF — Proficiency in Advanced Fire Fighting',
    'Refreshing & Updating for Advanced Fire Fighting (AFF)',
    'EFA — Proficiency in Elementary First Aid',
    'FPFF — Proficiency in Fire Prevention & Fire Fighting',
    'MFA — Proficiency in Medical First Aid',
    'Refreshing & Updating for Medical First Aid (MFA)',
    'PSCRB — Proficiency in Survival Craft & Rescue Boats other than Fast Rescue Boats',
    'Refreshing & Updating for PSCRB',
    'PSSR — Proficiency in Personal Safety & Social Responsibilities',
    'PST — Proficiency in Personal Survival Techniques',
    'Refresher & Updating for Fire Prevention & Fire-Fighting',
    'Revalidation Course for Deck Officers of Ships of 500GT or More — Operational Level',
    'SDSD — Proficiency in Security Training for Seafarers with Designated Security Duties',
  ],
  nonStcw: [
    'Crowd Management',
    'Certificate of Proficiency Deck/Engine (COP)',
    'Preparatory Course for Able Seafarer – Deck (COP Deck)',
    'Preparatory Course for Able Seafarer – Engine (COP Engine)',
    'Basic Short Courses (BST: Fire Prevention, PST, PSSR, EFA)',
    'Advanced Short Courses (Advanced Fire Fighting, Medical First Aid, PSCRB, Ship Security Officer)',
    'Refreshing & Updating Basic Courses',
    'Refresher & Updating Advanced Courses',
    'ROP — Radar Observation and Plotting',
    'SSO — Proficiency as Ship Security Officer',
    'SSA — Proficiency in Ship Security Awareness',
    'Passenger Ship Crisis Management & Human Behaviour',
  ],
  simulator: [
    'MEOL — Maritime English Language Course, Operational Level',
    'MESL — Maritime English Language Course, Support Level',
    'Engine Room Simulator, Operational Level',
    'ARPA — Automatic Radar Plotting Aids',
    'ECDIS — Electronic Chart Display & Information System',
    'ENS — Electronic Navigation Systems',
    'NWKS — Navigation Watch Keeping Simulator, Operational Level',
    'ROP — Radar Observation & Plotting',
    'RS — Radar Simulator',
    'ECDIS Type-Specific — Safe Bridge',
    'ECDIS Type-Specific — Furuno',
  ],
  customized: [
    'COLREGS',
    'HAZMAT',
    'Heavy Lift Operation Training Course',
    'VHF Communication',
    'AIDA Orientation (AIDA Cruises)',
    'Chart Symbols & Abbreviation',
    'Elementary Trauma Care',
    'IALA Maritime Buoyage System',
    'Introduction to Fire Safety & Survival at Sea',
    'Safety Awareness Course (Swire Shipping)',
  ],
}

export default function AdminCourses() {
  const [activeTab, setActiveTab] = useState('courses') // 'courses' | 'officer' | 'rating' | 'short'
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)

  // Settings-based programmes
  const [officerPrograms, setOfficerPrograms] = useState(defaultOfficerCadetPrograms)
  const [ratingPrograms, setRatingPrograms] = useState(defaultRatingPrograms)
  const [shortCoursesData, setShortCoursesData] = useState(defaultShortCourses)
  const [newShortItem, setNewShortItem] = useState({ category: 'stcw', text: '' })

  // Modal State for General Courses
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)

  const initialForm = {
    title: '',
    shortDescription: '',
    description: '',
    category: 'Officer Cadetship',
    duration: '36 Months',
    level: 'Degree',
    intake: 'January & July',
    featured: false,
    isActive: true,
    image: '',
    requirements: '',
    outcomes: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [courseRes, setRes] = await Promise.all([
        axios.get('/api/courses?includeInactive=true'),
        axios.get('/api/settings'),
      ])

      if (courseRes.data.success) {
        setCourses(courseRes.data.data)
      }

      if (setRes.data?.data) {
        const s = setRes.data.data
        if (s.officerCadetPrograms && s.officerCadetPrograms.length > 0) {
          setOfficerPrograms(s.officerCadetPrograms)
        }
        if (s.ratingPrograms && s.ratingPrograms.length > 0) {
          setRatingPrograms(s.ratingPrograms)
        }
        if (s.shortCourses && Object.keys(s.shortCourses).length > 0) {
          setShortCoursesData((prev) => ({ ...prev, ...s.shortCourses }))
        }
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch course data' })
    } finally {
      setLoading(false)
    }
  }

  // Save Settings (Officer, Rating, Short courses)
  const handleSaveProgrammes = async () => {
    setSavingSettings(true)
    setMsg({ type: '', text: '' })
    try {
      const token = localStorage.getItem('msti_admin_token')
      const payload = {
        officerCadetPrograms: officerPrograms,
        ratingPrograms: ratingPrograms,
        shortCourses: shortCoursesData,
      }
      const res = await axios.put('/api/settings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Programmes & Short Courses updated live successfully! 🚢' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save programmes' })
    } finally {
      setSavingSettings(false)
    }
  }

  // --- GENERAL COURSES HANDLERS ---
  const handleOpenAdd = () => {
    setEditMode(false)
    setEditingId(null)
    setFormData(initialForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (course) => {
    setEditMode(true)
    setEditingId(course._id)
    setFormData({
      title: course.title || '',
      shortDescription: course.shortDescription || '',
      description: course.description || '',
      category: course.category || 'Officer Cadetship',
      duration: course.duration || '',
      level: course.level || 'Degree',
      intake: course.intake || '',
      featured: course.featured || false,
      isActive: course.isActive !== undefined ? course.isActive : true,
      image: course.image || '',
      requirements: Array.isArray(course.requirements) ? course.requirements.join('\n') : '',
      outcomes: Array.isArray(course.outcomes) ? course.outcomes.join('\n') : '',
    })
    setModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploading(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, image: res.data.imageUrl }))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmitCourse = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('msti_admin_token')
      const authHeader = { headers: { Authorization: `Bearer ${token}` } }

      const payload = {
        ...formData,
        requirements: formData.requirements
          ? formData.requirements.split('\n').filter((r) => r.trim() !== '')
          : [],
        outcomes: formData.outcomes
          ? formData.outcomes.split('\n').filter((o) => o.trim() !== '')
          : [],
      }

      if (editMode) {
        await axios.put(`/api/courses/${editingId}`, payload, authHeader)
        setMsg({ type: 'success', text: 'Course updated successfully!' })
      } else {
        await axios.post('/api/courses', payload, authHeader)
        setMsg({ type: 'success', text: 'New Course added successfully!' })
      }

      setModalOpen(false)
      const res = await axios.get('/api/courses?includeInactive=true')
      setCourses(res.data.data)
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error saving course' })
    }
  }

  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      const token = localStorage.getItem('msti_admin_token')
      await axios.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMsg({ type: 'success', text: 'Course deleted successfully!' })
      const res = await axios.get('/api/courses?includeInactive=true')
      setCourses(res.data.data)
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete course' })
    }
  }

  // --- OFFICER PROGRAM HANDLERS ---
  const handleOfficerChange = (index, field, value) => {
    setOfficerPrograms((prev) =>
      prev.map((prog, i) => (i === index ? { ...prog, [field]: value } : prog))
    )
  }

  const handleAddOfficerProgram = () => {
    setOfficerPrograms((prev) => [
      ...prev,
      {
        title: 'New Officer Cadet Programme',
        category: 'Deck Department',
        duration: '24 Months',
        overview: '',
        journey: ['Phase I — Shore-based training (6 months)', 'Phase II — Sea training (12 months)'],
        requirements: ['GCE O/L and A/L passes', 'Age 18-24', 'Medical fitness'],
        outcome: 'Qualify for Class III CoC and international sea service.',
        careerSea: 'Third Officer → Second Officer → Chief Officer → Captain',
        careerAshore: 'Harbour Pilot, Marine Superintendent, Maritime Educator',
      },
    ])
  }

  const handleRemoveOfficerProgram = (index) => {
    if (!window.confirm('Delete this Officer Cadet Programme?')) return
    setOfficerPrograms((prev) => prev.filter((_, i) => i !== index))
  }

  // --- RATING PROGRAM HANDLERS ---
  const handleRatingChange = (index, field, value) => {
    setRatingPrograms((prev) =>
      prev.map((prog, i) => (i === index ? { ...prog, [field]: value } : prog))
    )
  }

  const handleAddRatingProgram = () => {
    setRatingPrograms((prev) => [
      ...prev,
      {
        title: 'New Rating Training Programme',
        category: 'Rating Training',
        duration: '9 Months',
        overview: '',
        requirements: '6 "S" passes at GCE O/L; age 18+; medical fitness.',
        careerPath: 'Ordinary Seaman / Rating → with experience progressing towards Officer level.',
      },
    ])
  }

  const handleRemoveRatingProgram = (index) => {
    if (!window.confirm('Delete this Rating Programme?')) return
    setRatingPrograms((prev) => prev.filter((_, i) => i !== index))
  }

  // --- SHORT COURSES HANDLERS ---
  const handleAddShortCourseItem = (category) => {
    if (!newShortItem.text.trim()) return
    setShortCoursesData((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newShortItem.text.trim()],
    }))
    setNewShortItem({ category: category, text: '' })
  }

  const handleRemoveShortCourseItem = (category, index) => {
    setShortCoursesData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }))
  }

  const handleShortCourseItemChange = (category, index, value) => {
    setShortCoursesData((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? value : item)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiBookOpen className="text-blue-500" /> Maritime Courses & Programmes Manager
          </h1>
          <p className="text-navy-300 text-xs mt-1">
            Manage Structured Disciplines, Officer Cadet Programmes, Ratings, and Short Courses catalogue.
          </p>
        </div>

        {activeTab !== 'courses' ? (
          <button
            onClick={handleSaveProgrammes}
            disabled={savingSettings}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
          >
            {savingSettings ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
            {savingSettings ? 'Saving All...' : 'Save All Programmes'}
          </button>
        ) : (
          <button
            onClick={handleOpenAdd}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
          >
            <FiPlus size={18} /> Add New Course Card
          </button>
        )}
      </div>

      {/* Status Message */}
      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <span>{msg.text}</span>
          <button onClick={() => setMsg({ type: '', text: '' })} className="cursor-pointer">
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
        {[
          { id: 'courses', label: '1. Structured Disciplines (Cards)', icon: FiLayers },
          { id: 'officer', label: '2. Officer Cadet Programmes', icon: FiAnchor },
          { id: 'rating', label: '3. Rating Training Programmes', icon: FiAward },
          { id: 'short', label: '4. Short Courses Catalogue', icon: FiSliders },
        ].map((tab) => (
          <button
            key={tab.id}
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

      {/* TAB 1: STRUCTURED DISCIPLINES (GENERAL COURSES) */}
      {activeTab === 'courses' && (
        <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-navy-400 flex items-center justify-center gap-2">
              <FiRefreshCw className="animate-spin text-blue-500" /> Loading course catalogue...
            </div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center text-navy-400">
              No courses found. Click "Add New Course Card" to create your first program!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-navy-200">
                <thead className="bg-navy-950 text-navy-400 text-xs font-semibold uppercase tracking-wider border-b border-navy-800">
                  <tr>
                    <th className="px-6 py-4">Course Image</th>
                    <th className="px-6 py-4">Title & Category</th>
                    <th className="px-6 py-4">Duration & Level</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-navy-850/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-navy-700 bg-navy-950 shrink-0">
                          {course.image ? (
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-navy-600">
                              <FiImage size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-base mb-1">{course.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-600/20 text-blue-400 text-[10px] font-semibold px-2.5 py-0.5 rounded border border-blue-500/20">
                            {course.category}
                          </span>
                          {course.intake && (
                            <span className="text-navy-400 text-[11px]">Intake: {course.intake}</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <div className="text-white font-medium">{course.duration}</div>
                        <div className="text-navy-400">{course.level}</div>
                      </td>

                      <td className="px-6 py-4">
                        {course.featured ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                            <FiStar size={12} className="fill-amber-400" /> Featured
                          </span>
                        ) : (
                          <span className="text-navy-500 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(course)}
                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Edit Course"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id, course.title)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Course"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OFFICER CADET PROGRAMMES */}
      {activeTab === 'officer' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Officer Cadet Programmes (Navigation, Engineering, etc.)</h2>
            <button
              onClick={handleAddOfficerProgram}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <FiPlus size={14} /> Add Officer Programme
            </button>
          </div>

          <div className="space-y-6">
            {officerPrograms.map((prog, idx) => (
              <div key={idx} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Programme #{idx + 1}: {prog.title || 'Untitled'}
                  </span>
                  {officerPrograms.length > 1 && (
                    <button
                      onClick={() => handleRemoveOfficerProgram(idx)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Programme"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] text-navy-400 mb-1">Programme Title</label>
                    <input
                      type="text"
                      value={prog.title || ''}
                      onChange={(e) => handleOfficerChange(idx, 'title', e.target.value)}
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Duration</label>
                    <input
                      type="text"
                      value={prog.duration || ''}
                      onChange={(e) => handleOfficerChange(idx, 'duration', e.target.value)}
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g. 24 Months"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Programme Overview & Description</label>
                  <textarea
                    rows={4}
                    value={prog.overview || ''}
                    onChange={(e) => handleOfficerChange(idx, 'overview', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">
                      Journey Phases (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      value={Array.isArray(prog.journey) ? prog.journey.join('\n') : prog.journey || ''}
                      onChange={(e) =>
                        handleOfficerChange(
                          idx,
                          'journey',
                          e.target.value.split('\n').filter((l) => l.trim() !== '')
                        )
                      }
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      placeholder="Phase I — Shore-based training (6 months)&#10;Phase II — On-board training (12 months)"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">
                      Entry Requirements (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      value={Array.isArray(prog.requirements) ? prog.requirements.join('\n') : prog.requirements || ''}
                      onChange={(e) =>
                        handleOfficerChange(
                          idx,
                          'requirements',
                          e.target.value.split('\n').filter((l) => l.trim() !== '')
                        )
                      }
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      placeholder="GCE O/L passes&#10;GCE A/L in Maths or Bio&#10;Age 18-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Qualification Outcome</label>
                  <input
                    type="text"
                    value={prog.outcome || ''}
                    onChange={(e) => handleOfficerChange(idx, 'outcome', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Career Paths at Sea</label>
                    <input
                      type="text"
                      value={prog.careerSea || ''}
                      onChange={(e) => handleOfficerChange(idx, 'careerSea', e.target.value)}
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="Third Officer → Second Officer → Chief Officer → Captain"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-navy-400 mb-1">Career Paths Ashore</label>
                    <input
                      type="text"
                      value={prog.careerAshore || ''}
                      onChange={(e) => handleOfficerChange(idx, 'careerAshore', e.target.value)}
                      className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="Harbour Pilot, Superintendent, Educator"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RATING TRAINING PROGRAMMES */}
      {activeTab === 'rating' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Rating Training Programmes (Deck, Engine, ETR, Catering)</h2>
            <button
              onClick={handleAddRatingProgram}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <FiPlus size={14} /> Add Rating Programme
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratingPrograms.map((prog, idx) => (
              <div key={idx} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Rating #{idx + 1}: {prog.title || 'Untitled'}
                  </span>
                  {ratingPrograms.length > 1 && (
                    <button
                      onClick={() => handleRemoveRatingProgram(idx)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Programme"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Programme Title</label>
                  <input
                    type="text"
                    value={prog.title || ''}
                    onChange={(e) => handleRatingChange(idx, 'title', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Overview Description</label>
                  <textarea
                    rows={3}
                    value={prog.overview || ''}
                    onChange={(e) => handleRatingChange(idx, 'overview', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Entry Standards & Requirements</label>
                  <textarea
                    rows={2}
                    value={prog.requirements || ''}
                    onChange={(e) => handleRatingChange(idx, 'requirements', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-navy-400 mb-1">Career Path Progression</label>
                  <textarea
                    rows={2}
                    value={prog.careerPath || ''}
                    onChange={(e) => handleRatingChange(idx, 'careerPath', e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SHORT COURSES CATALOGUE */}
      {activeTab === 'short' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Short Courses Catalogue Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'stcw', label: 'STCW Courses (Mandatory Safety)' },
              { key: 'nonStcw', label: 'Non-STCW Courses & Prep' },
              { key: 'simulator', label: 'Simulator & English Labs' },
              { key: 'customized', label: 'Customized Corporate Training' },
            ].map((cat) => (
              <div key={cat.key} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <h3 className="text-sm font-bold text-blue-400">{cat.label}</h3>
                  <span className="text-[11px] text-navy-400">
                    {(shortCoursesData[cat.key] || []).length} courses
                  </span>
                </div>

                {/* Add new item */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter short course title..."
                    value={newShortItem.category === cat.key ? newShortItem.text : ''}
                    onChange={(e) => setNewShortItem({ category: cat.key, text: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddShortCourseItem(cat.key)
                      }
                    }}
                    className="flex-1 bg-navy-950 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleAddShortCourseItem(cat.key)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-2 rounded-lg font-bold cursor-pointer shrink-0"
                  >
                    Add
                  </button>
                </div>

                {/* List */}
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {(shortCoursesData[cat.key] || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-navy-950 border border-navy-800"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleShortCourseItemChange(cat.key, idx, e.target.value)}
                        className="flex-1 bg-transparent text-xs text-navy-200 focus:outline-none focus:text-white"
                      />
                      <button
                        onClick={() => handleRemoveShortCourseItem(cat.key, idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer shrink-0"
                        title="Remove"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT GENERAL COURSE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editMode ? 'Edit Course Program' : 'Add New Course Program'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-navy-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Officer Cadetship Programme"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Officer Cadetship">Officer Cadetship</option>
                    <option value="Marine Engineering">Marine Engineering</option>
                    <option value="Port Management">Port Management</option>
                    <option value="Nautical Science">Nautical Science</option>
                    <option value="Safety & Security">Safety & Security</option>
                    <option value="Specialized Training">Specialized Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 36 Months"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Level
                  </label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Degree / Diploma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Short Summary (Shows on Homepage)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Short tagline for cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Full Course Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
                  placeholder="Detailed course overview..."
                />
              </div>

              {/* COURSE IMAGE */}
              <div className="space-y-2 bg-navy-950/60 p-4 border border-navy-800 rounded-xl">
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Course Banner Photo (Upload Image File or Enter URL)
                </label>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2 shrink-0">
                    <FiUpload size={14} />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    placeholder="or paste image URL..."
                  />
                </div>

                {formData.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-navy-700 mt-2 bg-navy-950">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Requirements (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                    placeholder="Minimum GCE A/L&#10;Age 17-25&#10;Medical fitness"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Career Outcomes (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.outcomes}
                    onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                    placeholder="Certificate of Competency&#10;International employment"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-navy-950 border-navy-700"
                  />
                  Featured on Homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {editMode ? 'Save Course Updates' : 'Add Course Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
