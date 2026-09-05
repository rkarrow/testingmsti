import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiMail, FiTrash2, FiRefreshCw, FiClock, FiUser, FiX } from 'react-icons/fi'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('msti_admin_token')
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        setContacts(res.data.data)
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch contact inquiries' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    try {
      const token = localStorage.getItem('msti_admin_token')
      await axios.delete(`/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMsg({ type: 'success', text: 'Inquiry deleted successfully' })
      if (selected?._id === id) setSelected(null)
      fetchContacts()
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete inquiry' })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FiMail className="text-purple-500" /> Contact Form Submissions & Inquiries
        </h1>
        <p className="text-navy-300 text-xs mt-1">
          Review admissions questions and campus visit inquiries sent by students.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-1 bg-navy-900 border border-navy-800 rounded-2xl p-4 shadow-xl space-y-3 max-h-[75vh] overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-400 px-2 pt-2">
            Inquiries ({contacts.length})
          </h2>

          {loading ? (
            <div className="p-8 text-center text-navy-400 text-xs flex items-center justify-center gap-2">
              <FiRefreshCw className="animate-spin text-purple-500" /> Loading inquiries...
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-8 text-center text-navy-400 text-xs">
              No inquiries received yet.
            </div>
          ) : (
            contacts.map((c) => (
              <div
                key={c._id}
                onClick={() => setSelected(c)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  selected?._id === c._id
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-navy-950/60 border-navy-800 text-navy-200 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white truncate">{c.name}</span>
                  <span className="text-[10px] text-navy-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs font-semibold text-blue-400 truncate mb-1">{c.subject}</div>
                <div className="text-[11px] text-navy-400 line-clamp-1">{c.message}</div>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail View Column */}
        <div className="lg:col-span-2 bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          {selected ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-navy-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selected.subject}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-navy-300">
                    <span className="flex items-center gap-1 font-semibold text-blue-400">
                      <FiUser size={14} /> {selected.name}
                    </span>
                    <span>•</span>
                    <span>{selected.email}</span>
                    {selected.phone && (
                      <>
                        <span>•</span>
                        <span>{selected.phone}</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selected._id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Inquiry"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>

              <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 text-navy-100 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {selected.message}
              </div>

              <div className="text-xs text-navy-400 flex items-center gap-1">
                <FiClock size={14} /> Submitted on {new Date(selected.createdAt).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-navy-500 text-sm">
              <FiMail size={40} className="mb-3 opacity-40" />
              Select an inquiry from the list to view message details.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
