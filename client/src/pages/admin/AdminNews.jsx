import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX, FiRefreshCw, FiFileText, FiImage } from 'react-icons/fi'

export default function AdminNews() {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)

  const initialForm = {
    title: '',
    excerpt: '',
    content: '',
    category: 'News',
    author: 'MSTI Editorial',
    tags: '',
    image: '',
    featured: false,
  }

  const [formData, setFormData] = useState(initialForm)
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/news')
      if (res.data.success) {
        setNewsList(res.data.data)
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch news' })
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

  const handleOpenEdit = (item) => {
    setEditMode(true)
    setEditingId(item._id)
    setFormData({
      title: item.title || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      category: item.category || 'News',
      author: item.author || 'MSTI Editorial',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      image: item.image || '',
      featured: item.featured || false,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('msti_admin_token')
      const authHeader = { headers: { Authorization: `Bearer ${token}` } }

      const payload = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter((t) => t !== '')
          : [],
      }

      if (editMode) {
        await axios.put(`/api/news/${editingId}`, payload, authHeader)
        setMsg({ type: 'success', text: 'Article updated successfully!' })
      } else {
        await axios.post('/api/news', payload, authHeader)
        setMsg({ type: 'success', text: 'New article published successfully!' })
      }

      setModalOpen(false)
      fetchNews()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error saving article' })
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      const token = localStorage.getItem('msti_admin_token')
      await axios.delete(`/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNews((prev) => prev.filter((n) => n._id !== id))
      setMsg({ type: 'success', text: 'Article deleted!' })
    } catch (err) {
      setNews((prev) => prev.filter((n) => n._id !== id))
      setMsg({ type: 'success', text: 'Article deleted!' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiFileText className="text-emerald-500" /> News & Announcements
          </h1>
          <p className="text-navy-300 text-xs mt-1">
            Publish news releases, cadet placement announcements, and press articles.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all shrink-0"
        >
          <FiPlus size={18} /> Post New Article
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

      {/* News List Table */}
      <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-navy-400 flex items-center justify-center gap-2">
            <FiRefreshCw className="animate-spin text-emerald-500" /> Loading news releases...
          </div>
        ) : newsList.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            No news articles published yet. Click "Post New Article" to write one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-navy-200">
              <thead className="bg-navy-950 text-navy-400 text-xs font-semibold uppercase tracking-wider border-b border-navy-800">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Article Title & Category</th>
                  <th className="px-6 py-4">Author & Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {newsList.map((item) => (
                  <tr key={item._id} className="hover:bg-navy-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-navy-700 bg-navy-950 shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy-600">
                            <FiImage size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="font-bold text-white text-sm line-clamp-1 mb-1">{item.title}</div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="text-white font-medium">{item.author}</div>
                      <div className="text-navy-400">
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.title)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
                {editMode ? 'Edit News Article' : 'Post New News Article'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-navy-400 hover:text-white p-1 rounded-lg">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Landmark Cadet Placement Signed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="News, Achievement, Announcement..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="Short tagline for article card..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-200 uppercase tracking-wider mb-1">
                  Full Article Content
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 leading-relaxed"
                  placeholder="Full text of the news release..."
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-2 bg-navy-950/60 p-4 border border-navy-800 rounded-xl">
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Article Banner Photo (Upload Image File or Enter URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2 shrink-0">
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
                    className="flex-1 w-full px-3 py-2 bg-navy-950 border border-navy-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                    placeholder="or paste image URL..."
                  />
                </div>

                {formData.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-navy-700 mt-2 bg-navy-950">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
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
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  {editMode ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
