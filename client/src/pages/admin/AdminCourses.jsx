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
  FiCheckCircle,
  FiShield,
} from 'react-icons/fi'
import { defaultStcwCourses } from '../../data/defaultStcwCourses'
import { defaultCadetStandards, defaultRatingStandards } from '../../data/defaultStandards'

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

  // Enrolment & Medical Standards States (Cadet & Rating)
  const [cadetStandards, setCadetStandards] = useState(defaultCadetStandards)
  const [ratingStandards, setRatingStandards] = useState(defaultRatingStandards)
  const [standardsSubTab, setStandardsSubTab] = useState('cadet') // 'cadet' | 'rating'

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
    duration: '',
    level: '',
    intake: '',
    featured: false,
    isActive: true,
    image: '',
    requirements: '',
    outcomes: '',
    careerGrowth: '',
    careerSea: '',
    careerAshore: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [msg, setMsg] = useState({ type: '', text: '' })

  // STCW Courses CRUD States
  const [stcwData, setStcwData] = useState(defaultStcwCourses)
  const [stcwFilterCat, setStcwFilterCat] = useState('all')
  const [stcwModalOpen, setStcwModalOpen] = useState(false)
  const [stcwEditMode, setStcwEditMode] = useState(false)
  const initialStcwForm = {
    original_category_id: '',
    original_id: '',
    category_id: 'basic-short-courses',
    id: '',
    code: '',
    name: '',
    slug: '',
    image: '',
    duration: '',
    description: '',
    requirements: '',
    outcomes: '',
  }
  const [stcwFormData, setStcwFormData] = useState(initialStcwForm)
  const [uploadingStcw, setUploadingStcw] = useState(false)
  const [savingStcw, setSavingStcw] = useState(false)
  const [subCatModalOpen, setSubCatModalOpen] = useState(false)
  const [newSubCatForm, setNewSubCatForm] = useState({ title: '', category_id: '', slug: '' })

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
        if (s.stcwData && Array.isArray(s.stcwData) && s.stcwData.length > 0) {
          setStcwData(s.stcwData)
        }
        if (s.officerCadetPrograms && s.officerCadetPrograms.length > 0) {
          setOfficerPrograms(s.officerCadetPrograms)
        }
        if (s.ratingPrograms && s.ratingPrograms.length > 0) {
          setRatingPrograms(s.ratingPrograms)
        }
        if (s.shortCourses && Object.keys(s.shortCourses).length > 0) {
          setShortCoursesData((prev) => ({ ...prev, ...s.shortCourses }))
        }
        if (s.cadetStandards && Object.keys(s.cadetStandards).length > 0) {
          setCadetStandards((prev) => ({ ...prev, ...s.cadetStandards }))
        }
        if (s.ratingStandards && Object.keys(s.ratingStandards).length > 0) {
          setRatingStandards((prev) => ({ ...prev, ...s.ratingStandards }))
        }
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch course data' })
    } finally {
      setLoading(false)
    }
  }

  // Save Settings (Officer, Rating, Short courses, Standards)
  const handleSaveProgrammes = async () => {
    setSavingSettings(true)
    setMsg({ type: '', text: '' })
    try {
      const token = localStorage.getItem('msti_admin_token')
      const payload = {
        officerCadetPrograms: officerPrograms,
        ratingPrograms: ratingPrograms,
        shortCourses: shortCoursesData,
        cadetStandards: cadetStandards,
        ratingStandards: ratingStandards,
      }
      const res = await axios.put('/api/settings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Programmes & Standards updated live successfully! 🚢' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save programmes' })
    } finally {
      setSavingSettings(false)
    }
  }

  const handleStandardsFieldChange = (sectionType, field, value) => {
    if (sectionType === 'cadet') {
      setCadetStandards((prev) => ({ ...prev, [field]: value }))
    } else {
      setRatingStandards((prev) => ({ ...prev, [field]: value }))
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
      level: course.level || '',
      intake: course.intake || '',
      featured: course.featured || false,
      isActive: course.isActive !== undefined ? course.isActive : true,
      image: course.image || '',
      requirements: Array.isArray(course.requirements) ? course.requirements.join('\n') : '',
      outcomes: Array.isArray(course.outcomes) ? course.outcomes.join('\n') : '',
      careerGrowth: course.careerGrowth || '',
      careerSea: course.careerSea || '',
      careerAshore: course.careerAshore || '',
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

  // --- STCW COURSES CRUD HANDLERS ---
  const handleSaveStcw = async (overrideData) => {
    const dataToSave = overrideData || stcwData
    try {
      setSavingStcw(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.put(
        '/api/settings',
        { stcwData: dataToSave },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setMsg({ type: 'success', text: 'STCW Courses updated & saved live! 🚢' })
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save STCW Courses' })
    } finally {
      setSavingStcw(false)
    }
  }

  const handleStcwImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      setUploadingStcw(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        setStcwFormData((prev) => ({ ...prev, image: res.data.imageUrl }))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploadingStcw(false)
    }
  }

  const handleOpenAddStcw = (catId = 'basic-short-courses') => {
    setStcwEditMode(false)
    setStcwFormData({
      ...initialStcwForm,
      category_id: catId,
    })
    setStcwModalOpen(true)
  }

  const handleOpenEditStcw = (catId, item) => {
    setStcwEditMode(true)
    setStcwFormData({
      original_category_id: catId,
      original_id: item.id || item.code,
      category_id: catId,
      id: item.id || '',
      code: item.code || '',
      name: item.name || '',
      slug: item.slug || '',
      image: item.image || '',
      duration: item.duration || '',
      description: item.description || '',
      requirements: item.requirements || '',
      outcomes: item.outcomes || '',
    })
    setStcwModalOpen(true)
  }

  const handleSubmitStcwCourse = (e) => {
    e.preventDefault()
    if (!stcwFormData.code.trim() || !stcwFormData.name.trim()) {
      alert('Please fill in both Course Code and Course Name')
      return
    }

    const updated = JSON.parse(JSON.stringify(stcwData))
    if (!updated[0]) {
      updated[0] = { category_id: 'stcw-courses', title: 'STCW Courses', slug: '/stcw-courses', children: [] }
    }
    if (!updated[0].children) updated[0].children = []

    const autoSlug =
      stcwFormData.slug.trim() ||
      `/stcw-courses/${stcwFormData.category_id}/${stcwFormData.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

    if (stcwEditMode) {
      // Remove from old category
      const oldCat = updated[0].children.find((c) => c.category_id === stcwFormData.original_category_id)
      if (oldCat && oldCat.items) {
        oldCat.items = oldCat.items.filter(
          (it) => it.id !== stcwFormData.original_id && it.code !== stcwFormData.original_id
        )
      }
    }

    // Add to target category
    const targetCat = updated[0].children.find((c) => c.category_id === stcwFormData.category_id)
    if (targetCat) {
      if (!targetCat.items) targetCat.items = []
      targetCat.items.push({
        id: stcwFormData.id.trim() || (stcwEditMode ? stcwFormData.original_id : `${targetCat.items.length + 1}.1`),
        code: stcwFormData.code.trim().toUpperCase(),
        name: stcwFormData.name.trim(),
        slug: autoSlug,
        image: stcwFormData.image?.trim() || '',
        duration: stcwFormData.duration?.trim() || '',
        description: stcwFormData.description?.trim() || '',
        requirements: stcwFormData.requirements?.trim() || '',
        outcomes: stcwFormData.outcomes?.trim() || '',
      })
    }

    setStcwData(updated)
    setStcwModalOpen(false)
    handleSaveStcw(updated)
  }

  const handleDeleteStcwCourse = (catId, item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.code} — ${item.name}"?`)) return
    const updated = JSON.parse(JSON.stringify(stcwData))
    const root = updated[0]
    if (root && root.children) {
      const targetCat = root.children.find((c) => c.category_id === catId)
      if (targetCat && targetCat.items) {
        targetCat.items = targetCat.items.filter((it) => it.code !== item.code && it.id !== item.id)
      }
    }
    setStcwData(updated)
    handleSaveStcw(updated)
  }

  const handleAddSubCatSubmit = (e) => {
    e.preventDefault()
    if (!newSubCatForm.title.trim()) return

    const catId =
      newSubCatForm.category_id.trim() ||
      newSubCatForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const slug = newSubCatForm.slug.trim() || `/stcw-courses/${catId}`

    const updated = JSON.parse(JSON.stringify(stcwData))
    if (!updated[0]) {
      updated[0] = { category_id: 'stcw-courses', title: 'STCW Courses', slug: '/stcw-courses', children: [] }
    }
    if (!updated[0].children) updated[0].children = []

    updated[0].children.push({
      category_id: catId,
      title: newSubCatForm.title.trim(),
      slug: slug,
      items: [],
    })

    setStcwData(updated)
    setSubCatModalOpen(false)
    setNewSubCatForm({ title: '', category_id: '', slug: '' })
    handleSaveStcw(updated)
  }

  const handleDeleteSubCat = (catId, title) => {
    if (!window.confirm(`Are you sure you want to delete category "${title}" and all its courses?`)) return
    const updated = JSON.parse(JSON.stringify(stcwData))
    const root = updated[0]
    if (root && root.children) {
      root.children = root.children.filter((c) => c.category_id !== catId)
    }
    setStcwData(updated)
    handleSaveStcw(updated)
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

        {activeTab === 'stcw' ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSubCatModalOpen(true)}
              className="bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-2 border border-navy-700 transition-all shrink-0 cursor-pointer"
            >
              <FiPlus size={16} /> Add Sub-Category
            </button>
            <button
              onClick={() => handleOpenAddStcw(stcwFilterCat !== 'all' ? stcwFilterCat : 'basic-short-courses')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
            >
              <FiPlus size={16} /> Add STCW Course
            </button>
            <button
              onClick={() => handleSaveStcw()}
              disabled={savingStcw}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all shrink-0 cursor-pointer"
            >
              {savingStcw ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
              {savingStcw ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ) : activeTab !== 'courses' ? (
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
          { id: 'stcw', label: '2. STCW Courses (Hierarchical CRUD)', icon: FiCheckCircle },
          { id: 'standards', label: '3. Enrolment & Medical Standards', icon: FiShield },
          { id: 'officer', label: '4. Officer Cadet Programmes', icon: FiAnchor },
          { id: 'rating', label: '5. Rating Training Programmes', icon: FiAward },
          { id: 'short', label: '6. Short Courses Catalogue', icon: FiSliders },
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
                    <th className="px-6 py-4">Duration & LICENSE</th>
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

      {/* TAB 2: STCW COURSES (HIERARCHICAL CRUD) */}
      {activeTab === 'stcw' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/60 border border-navy-800 p-5 rounded-2xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" /> STCW Hierarchical Courses Management
              </h2>
              <p className="text-xs text-navy-400 mt-1">
                Add, edit, or delete STCW course modules, course codes (e.g. FPFF, PST), sub-categories, and links.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubCatModalOpen(true)}
                className="bg-navy-800 hover:bg-navy-750 text-navy-200 border border-navy-700 text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-semibold cursor-pointer transition-colors"
              >
                <FiPlus size={14} /> Add Sub-Category
              </button>
              <button
                onClick={() => handleOpenAddStcw(stcwFilterCat !== 'all' ? stcwFilterCat : 'basic-short-courses')}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-semibold shadow-lg shadow-blue-600/20 cursor-pointer transition-colors"
              >
                <FiPlus size={14} /> Add STCW Course
              </button>
            </div>
          </div>

          {/* Sub-Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStcwFilterCat('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                stcwFilterCat === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-navy-900 text-navy-400 hover:text-white border border-navy-800'
              }`}
            >
              All Categories ({stcwData[0]?.children?.reduce((acc, c) => acc + (c.items?.length || 0), 0) || 0})
            </button>
            {stcwData[0]?.children?.map((subCat) => (
              <button
                key={subCat.category_id}
                onClick={() => setStcwFilterCat(subCat.category_id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  stcwFilterCat === subCat.category_id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-navy-900 text-navy-400 hover:text-white border border-navy-800'
                }`}
              >
                <span>{subCat.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-navy-800 text-navy-300">
                  {subCat.items?.length || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Sub Categories and their Courses */}
          <div className="space-y-6">
            {stcwData[0]?.children
              ?.filter((subCat) => stcwFilterCat === 'all' || stcwFilterCat === subCat.category_id)
              .map((subCat) => (
                <div key={subCat.category_id} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4 shadow-xl">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <h3 className="text-base font-bold text-white">{subCat.title}</h3>
                        <span className="text-[10px] font-mono bg-navy-800 text-blue-400 px-2 py-0.5 rounded border border-navy-700">
                          {subCat.category_id}
                        </span>
                      </div>
                      <p className="text-xs text-navy-400 mt-1 font-mono">Slug: {subCat.slug}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenAddStcw(subCat.category_id)}
                        className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold cursor-pointer transition-colors"
                      >
                        <FiPlus size={14} /> Add Course Here
                      </button>
                      <button
                        onClick={() => handleDeleteSubCat(subCat.category_id, subCat.title)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Delete Entire Category"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Courses List */}
                  {subCat.items && subCat.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {subCat.items.map((item, idx) => (
                        <div
                          key={item.id || item.code || idx}
                          className="bg-navy-950 border border-navy-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-navy-700 transition-colors"
                        >
                          <div className="space-y-2">
                            {item.image ? (
                              <div className="w-full h-24 rounded-lg overflow-hidden border border-navy-800 bg-navy-900">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-full h-14 rounded-lg border border-dashed border-navy-800 bg-navy-900/40 flex items-center justify-center text-navy-600 gap-1.5 text-[11px]">
                                <FiImage size={14} /> No Photo Uploaded
                              </div>
                            )}

                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold">
                                {item.code}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {item.duration && (
                                  <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded font-medium">
                                    {item.duration}
                                  </span>
                                )}
                                {item.id && (
                                  <span className="text-[10px] font-mono text-navy-500">
                                    #{item.id}
                                  </span>
                                )}
                              </div>
                            </div>
                            <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-navy-400 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            <p className="text-[10px] font-mono text-navy-500 truncate" title={item.slug}>
                              {item.slug}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-navy-850">
                            <button
                              onClick={() => handleOpenEditStcw(subCat.category_id, item)}
                              className="text-xs text-blue-400 hover:text-blue-300 bg-navy-900 hover:bg-navy-800 px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer font-medium border border-navy-800 transition-colors"
                            >
                              <FiEdit2 size={12} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStcwCourse(subCat.category_id, item)}
                              className="text-xs text-red-400 hover:text-red-300 bg-navy-900 hover:bg-red-500/10 px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer font-medium border border-navy-800 transition-colors"
                            >
                              <FiTrash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-navy-950/40 rounded-xl border border-dashed border-navy-800 text-xs text-navy-400">
                      No courses in this sub-category yet. Click "Add Course Here" to add one.
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: ENROLMENT & MEDICAL STANDARDS (CADET & RATING) */}
      {activeTab === 'standards' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiShield className="text-blue-500" /> Cadet & Rating Enrolment & Medical Standards
              </h2>
              <p className="text-navy-400 text-xs mt-1">
                Customize admissions requirements, medical fitness criteria, guaranteed placement, and CTA banners for both Officer Cadets and Ratings.
              </p>
            </div>

            <button
              onClick={handleSaveProgrammes}
              disabled={savingSettings}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all shrink-0 cursor-pointer"
            >
              {savingSettings ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
              {savingSettings ? 'Saving...' : 'Save Standards'}
            </button>
          </div>

          {/* Sub-Tabs: Cadet vs Rating */}
          <div className="flex items-center gap-3 bg-navy-950 p-1.5 rounded-xl border border-navy-800 w-fit">
            <button
              onClick={() => setStandardsSubTab('cadet')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                standardsSubTab === 'cadet'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-navy-400 hover:text-white'
              }`}
            >
              <FiAnchor size={14} /> Cadet Enrolment Standards
            </button>
            <button
              onClick={() => setStandardsSubTab('rating')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                standardsSubTab === 'rating'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-navy-400 hover:text-white'
              }`}
            >
              <FiAward size={14} /> Rating Enrolment Standards
            </button>
          </div>

          {/* Standards Form Body */}
          {(() => {
            const curr = standardsSubTab === 'cadet' ? cadetStandards : ratingStandards
            const subTitle = standardsSubTab === 'cadet' ? 'Cadet Standards Configuration' : 'Rating Standards Configuration'

            return (
              <div className="space-y-6">
                {/* 1. Header Information */}
                <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Section Header & Tagline ({subTitle})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Pill Badge Text
                      </label>
                      <input
                        type="text"
                        value={curr.badge || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'badge', e.target.value)}
                        placeholder="e.g. Admissions or Rating Admissions"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Section Main Title *
                      </label>
                      <input
                        type="text"
                        value={curr.title || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'title', e.target.value)}
                        placeholder="e.g. Cadet Enrolment & Medical Standards"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                      Section Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={curr.description || ''}
                      onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'description', e.target.value)}
                      placeholder="Brief overview explaining standards and requirements..."
                      className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>
                </div>

                {/* 2. Medical Standards & Enrolment Requirements (Two Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Medical Standards */}
                  <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FiShield className="text-blue-400" /> Medical Standards Card
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={curr.medicalTitle || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'medicalTitle', e.target.value)}
                        placeholder="e.g. Medical Standards"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Medical Fitness Criteria (1 item per line)
                      </label>
                      <p className="text-[11px] text-navy-400 mb-2">
                        Each line appears as a checklist item with a green checkmark icon.
                      </p>
                      <textarea
                        rows={8}
                        value={Array.isArray(curr.medicalItems) ? curr.medicalItems.join('\n') : curr.medicalItems || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'medicalItems', e.target.value.split('\n'))}
                        placeholder="Vision: Minimum 6/6 corrected or uncorrected&#10;Color vision: No red/green color blindness&#10;Hearing: Adequate for bridge communication"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Right Column: Enrolment Requirements */}
                  <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FiBookOpen className="text-blue-400" /> Enrolment Requirements Card
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={curr.enrolmentTitle || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'enrolmentTitle', e.target.value)}
                        placeholder="e.g. Enrolment Requirements"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                        Academic Requirements (1 per line)
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(curr.academicRequirements) ? curr.academicRequirements.join('\n') : curr.academicRequirements || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'academicRequirements', e.target.value.split('\n'))}
                        placeholder="Minimum GCE A/L qualification&#10;Mathematics & Physics for Engineering"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                        Age Criteria (1 per line)
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(curr.ageRequirements) ? curr.ageRequirements.join('\n') : curr.ageRequirements || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'ageRequirements', e.target.value.split('\n'))}
                        placeholder="Officer Cadetship: 17–25 years&#10;Short courses: 18+ years"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                        Documents Required (1 per line)
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(curr.documentRequirements) ? curr.documentRequirements.join('\n') : curr.documentRequirements || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'documentRequirements', e.target.value.split('\n'))}
                        placeholder="Certified copies of educational certificates&#10;Birth certificate&#10;National ID or passport"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Placement Banner & Action Button */}
                <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FiAward className="text-blue-400" /> Placement Guarantee & CTA Button
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Placement Banner Title
                      </label>
                      <input
                        type="text"
                        value={curr.placementTitle || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'placementTitle', e.target.value)}
                        placeholder="e.g. 🎯 Guaranteed Placement"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        Placement Banner Text
                      </label>
                      <textarea
                        rows={2}
                        value={curr.placementText || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'placementText', e.target.value)}
                        placeholder="Describe placement support or shipping line partnerships..."
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={curr.ctaText || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'ctaText', e.target.value)}
                        placeholder="e.g. Start Enrolment Process"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                        CTA Button Target Link
                      </label>
                      <input
                        type="text"
                        value={curr.ctaLink || ''}
                        onChange={(e) => handleStandardsFieldChange(standardsSubTab, 'ctaLink', e.target.value)}
                        placeholder="e.g. /contact or /apply"
                        className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Save Bar */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={handleSaveProgrammes}
                    disabled={savingSettings}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs px-8 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    {savingSettings ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
                    {savingSettings ? 'Saving All Standards...' : 'Save All Standards'}
                  </button>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* TAB 4: OFFICER CADET PROGRAMMES */}
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
                    LICENSE
                  </label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. STCW II/1, Officer of the Watch, COC"
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

              {/* CAREER GROWTH & PROGRESSION */}
              <div className="space-y-3 bg-navy-950/70 p-4 border border-navy-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <FiAnchor className="text-amber-400" size={16} />
                  <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Career Growth & Progression Description
                  </label>
                </div>
                <textarea
                  rows={4}
                  value={formData.careerGrowth}
                  onChange={(e) => setFormData({ ...formData, careerGrowth: e.target.value })}
                  className="w-full px-3 py-2.5 bg-navy-900 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Enter detailed career growth and progression description for this course (e.g. seafaring career ladder, salary growth, global opportunities)..."
                />
                <p className="text-[11px] text-navy-400">
                  This description will appear directly inside the "⚓ Career Growth & Progression" card on the course details page.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-navy-300 uppercase tracking-wider mb-1">
                      Career Progression at Sea (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.careerSea}
                      onChange={(e) => setFormData({ ...formData, careerSea: e.target.value })}
                      className="w-full px-3 py-2 bg-navy-900 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Third Officer → Second Officer → Chief Officer → Captain"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-navy-300 uppercase tracking-wider mb-1">
                      Career Opportunities Ashore (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.careerAshore}
                      onChange={(e) => setFormData({ ...formData, careerAshore: e.target.value })}
                      className="w-full px-3 py-2 bg-navy-900 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Harbour Pilot, Marine Superintendent, Educator"
                    />
                  </div>
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

      {/* ADD / EDIT STCW COURSE MODAL */}
      {stcwModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {stcwEditMode ? 'Edit STCW Course' : 'Add New STCW Course'}
              </h2>
              <button
                onClick={() => setStcwModalOpen(false)}
                className="text-navy-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitStcwCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Target Sub-Category *
                </label>
                <select
                  value={stcwFormData.category_id}
                  onChange={(e) => setStcwFormData({ ...stcwFormData, category_id: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {stcwData[0]?.children?.map((subCat) => (
                    <option key={subCat.category_id} value={subCat.category_id}>
                      {subCat.title} ({subCat.category_id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FPFF, PST, MFA"
                    value={stcwFormData.code}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Course Number / ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1.1, 2.3"
                    value={stcwFormData.id}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, id: e.target.value })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Course Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fire Prevention and Fire Fighting"
                  value={stcwFormData.name}
                  onChange={(e) => setStcwFormData({ ...stcwFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Course Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Course Photo (Upload or URL)
                </label>
                <div className="flex gap-2 items-center">
                  <label className="bg-navy-850 hover:bg-navy-800 text-white border border-navy-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shrink-0">
                    {uploadingStcw ? <FiRefreshCw className="animate-spin text-blue-400" /> : <FiUpload />}
                    {uploadingStcw ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleStcwImageUpload}
                      disabled={uploadingStcw}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={stcwFormData.image}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, image: e.target.value })}
                    className="flex-1 w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    placeholder="or paste image URL..."
                  />
                </div>

                {stcwFormData.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-navy-700 mt-2 bg-navy-950">
                    <img src={stcwFormData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Duration & Custom Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Days, 1 Week"
                    value={stcwFormData.duration}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Custom Slug / URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-generated if left empty"
                    value={stcwFormData.slug}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Course Overview & Description */}
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Course Overview & Description
                </label>
                <textarea
                  rows={3}
                  value={stcwFormData.description}
                  onChange={(e) => setStcwFormData({ ...stcwFormData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                  placeholder="Detailed information about the STCW course syllabus, IMO requirements, and competencies covered..."
                />
              </div>

              {/* Requirements & Certification Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Entry Requirements (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={stcwFormData.requirements}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, requirements: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                    placeholder="Medical Fitness Certificate&#10;Minimum 16 years of age"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Certification Outcomes (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={stcwFormData.outcomes}
                    onChange={(e) => setStcwFormData({ ...stcwFormData, outcomes: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                    placeholder="IMO STCW Certificate of Proficiency&#10;Approved by DGMS Sri Lanka"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setStcwModalOpen(false)}
                  className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStcw}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                >
                  {savingStcw ? 'Saving...' : stcwEditMode ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SUB-CATEGORY MODAL */}
      {subCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h2 className="text-lg font-bold text-white">Add New STCW Sub-Category</h2>
              <button
                onClick={() => setSubCatModalOpen(false)}
                className="text-navy-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubCatSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Specialised Tanker Courses"
                  value={newSubCatForm.title}
                  onChange={(e) =>
                    setNewSubCatForm({
                      ...newSubCatForm,
                      title: e.target.value,
                      category_id: newSubCatForm.category_id || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      slug: newSubCatForm.slug || `/stcw-courses/${e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Category ID (Slug Key)
                </label>
                <input
                  type="text"
                  placeholder="e.g. specialised-tanker-courses"
                  value={newSubCatForm.category_id}
                  onChange={(e) => setNewSubCatForm({ ...newSubCatForm, category_id: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Slug / URL Path
                </label>
                <input
                  type="text"
                  placeholder="e.g. /stcw-courses/specialised-tanker-courses"
                  value={newSubCatForm.slug}
                  onChange={(e) => setNewSubCatForm({ ...newSubCatForm, slug: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setSubCatModalOpen(false)}
                  className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStcw}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                >
                  {savingStcw ? 'Saving...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
