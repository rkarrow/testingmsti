import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiImage, FiPlus, FiTrash2, FiUploadCloud, FiSave, FiX, FiEdit3, FiCamera } from 'react-icons/fi'

const CATEGORIES = ['General', 'Training', 'Events', 'Campus', 'Activities', 'Ceremonies', 'Sports']

export default function AdminGallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editPhoto, setEditPhoto] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const [form, setForm] = useState({
    title: '', description: '', imageUrl: '', category: 'General', order: 0
  })

  const token = localStorage.getItem('msti_admin_token')
  const authH = { headers: { Authorization: `Bearer ${token}` } }

  const showMsg = (type, text) => {
    setMsg({ type, text })
    setTimeout(() => setMsg({ type: '', text: '' }), 3500)
  }

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/gallery')
      setPhotos(res.data.data || [])
    } catch { showMsg('error', 'Failed to load photos') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchPhotos() }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await axios.post('/api/upload', fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      if (res.data.url) {
        setForm(f => ({ ...f, imageUrl: res.data.url }))
        showMsg('success', 'Image uploaded!')
      }
    } catch { showMsg('error', 'Upload failed. Try again.') }
    finally { setUploading(false) }
  }

  const openAdd = () => {
    setEditPhoto(null)
    setForm({ title: '', description: '', imageUrl: '', category: 'General', order: 0 })
    setShowForm(true)
  }

  const openEdit = (photo) => {
    setEditPhoto(photo)
    setForm({
      title: photo.title || '',
      description: photo.description || '',
      imageUrl: photo.imageUrl || '',
      category: photo.category || 'General',
      order: photo.order || 0,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.imageUrl) return showMsg('error', 'Please upload or enter an image URL')
    try {
      if (editPhoto) {
        await axios.put(`/api/gallery/${editPhoto._id}`, form, authH)
        showMsg('success', 'Photo updated!')
      } else {
        await axios.post('/api/gallery', form, authH)
        showMsg('success', 'Photo added!')
      }
      setShowForm(false)
      fetchPhotos()
    } catch { showMsg('error', 'Save failed. Try again.') }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/${id}`, authH)
      showMsg('success', 'Photo deleted')
      setDeleteId(null)
      fetchPhotos()
    } catch { showMsg('error', 'Delete failed') }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Gallery Management</h1>
          <p className="text-navy-400 text-sm mt-1">{photos.length} photo{photos.length !== 1 ? 's' : ''} published</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-blue-600/25">
          <FiPlus size={18} /> Add Photo
        </button>
      </div>

      {/* Message */}
      {msg.text && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
          msg.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/25 text-red-400'
        }`}>
          {msg.type === 'success' ? '✓' : '✕'} {msg.text}
        </div>
      )}

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
          <div className="relative z-10 bg-navy-900 border border-navy-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-black text-xl">{editPhoto ? 'Edit Photo' : 'Add New Photo'}</h2>
              <button onClick={() => setShowForm(false)}
                className="w-8 h-8 bg-navy-800 hover:bg-navy-700 rounded-full flex items-center justify-center text-navy-400 hover:text-white transition-colors cursor-pointer">
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">
                  Photo *
                </label>
                {form.imageUrl && (
                  <div className="relative mb-3">
                    <img src={form.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                    <button type="button" onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                      <FiX size={13} />
                    </button>
                  </div>
                )}
                <label className="flex flex-col items-center justify-center gap-2 w-full h-28 bg-navy-800/50 border-2 border-dashed border-navy-600 hover:border-blue-500 rounded-xl cursor-pointer transition-colors">
                  <FiUploadCloud size={22} className={uploading ? 'text-blue-400 animate-bounce' : 'text-navy-400'} />
                  <span className="text-xs text-navy-400">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-px bg-navy-800" />
                  <span className="text-navy-600 text-xs">or paste URL</span>
                  <div className="flex-1 h-px bg-navy-800" />
                </div>
                <input type="url" placeholder="https://example.com/photo.jpg"
                  value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full mt-2 px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500" />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Title</label>
                <input type="text" placeholder="Photo title (optional)"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Description</label>
                <textarea placeholder="Short description (optional)" rows={2}
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-white text-sm placeholder-navy-600 focus:outline-none focus:border-blue-500 resize-none" />
              </div>

              {/* Category + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Order</label>
                  <input type="number" min={0} placeholder="0"
                    value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <button type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2">
                <FiSave size={16} />
                {editPhoto ? 'Update Photo' : 'Add to Gallery'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
          <div className="relative z-10 bg-navy-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full text-center"
            onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={22} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Delete Photo?</h3>
            <p className="text-navy-400 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 bg-navy-800 hover:bg-navy-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-navy-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-20 bg-navy-900/40 border border-dashed border-navy-700 rounded-2xl">
          <FiCamera size={48} className="text-navy-600 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No Photos Yet</h3>
          <p className="text-navy-400 text-sm mb-6">Add your first photo to the gallery</p>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer">
            <FiPlus size={16} /> Add First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="group relative bg-navy-900 rounded-2xl overflow-hidden border border-navy-800 hover:border-navy-600 transition-colors">
              <div className="aspect-square overflow-hidden">
                <img src={photo.imageUrl} alt={photo.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold truncate mb-2">{photo.title || 'Untitled'}</p>
                <span className="text-[10px] bg-blue-600/70 text-white px-2 py-0.5 rounded-full">{photo.category}</span>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openEdit(photo)}
                    className="flex-1 py-1.5 bg-white/10 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
                    <FiEdit3 size={12} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(photo._id)}
                    className="flex-1 py-1.5 bg-white/10 hover:bg-red-600 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
