import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiCheck, FiX, FiRefreshCw, FiBookOpen, FiImage, FiStar } from 'react-icons/fi'

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
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
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/courses?includeInactive=true')
      if (res.data.success) {
        setCourses(res.data.data)
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch courses' })
    } finally {
      setLoading(false)
    }
  }

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

  // Course Image Upload
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

  const handleSubmit = async (e) => {
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
      fetchCourses()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error saving course' })
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      const token = localStorage.getItem('msti_admin_token')
      await axios.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMsg({ type: 'success', text: 'Course deleted successfully!' })
      fetchCourses()
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete course' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiBookOpen className="text-blue-500" /> Courses & Cadetship Programs
          </h1>
          <p className="text-navy-300 text-xs mt-1">
            Add new courses, edit requirements, upload course images, and set featured courses.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0"
        >
          <FiPlus size={18} /> Add New Course
        </button>
      </div>

      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <span>{msg.text}</span>
          <button onClick={() => setMsg({ type: '', text: '' })}><FiX size={16} /></button>
        </div>
      )}

      {/* Courses List Table */}
      <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-navy-400 flex items-center justify-center gap-2">
            <FiRefreshCw className="animate-spin text-blue-500" /> Loading course catalogue...
          </div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            No courses found. Click "Add New Course" to create your first program!
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
                    {/* Course Image */}
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

                    {/* Title & Category */}
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

                    {/* Duration & Level */}
                    <td className="px-6 py-4 text-xs">
                      <div className="text-white font-medium">{course.duration}</div>
                      <div className="text-navy-400">{course.level}</div>
                    </td>

                    {/* Featured Star */}
                    <td className="px-6 py-4">
                      {course.featured ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                          <FiStar size={12} className="fill-amber-400" /> Featured
                        </span>
                      ) : (
                        <span className="text-navy-500 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(course)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit Course"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id, course.title)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editMode ? 'Edit Course Program' : 'Add New Course Program'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-navy-400 hover:text-white p-1 rounded-lg"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
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

              {/* Category, Duration, Level */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Department / Category
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

              {/* Short Description */}
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

              {/* Full Description */}
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

              {/* COURSE IMAGE UPLOAD & URL */}
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

              {/* Requirements & Outcomes */}
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

              {/* Checkboxes */}
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

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30"
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
