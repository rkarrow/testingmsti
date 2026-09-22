import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiGrid, FiFilter } from 'react-icons/fi'
import CTASection from '../components/CTASection'

// Animate on scroll hook
function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function AnimatedCard({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  )
}

const DEFAULT_PHOTOS = [
  { _id: 'd1', title: 'Bridge Simulator Training', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800' },
  { _id: 'd2', title: 'Cadet Graduation Ceremony', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' },
  { _id: 'd3', title: 'Engine Room Training', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112d4e5f9e?w=800' },
  { _id: 'd4', title: 'Sea Survival Practice', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800' },
  { _id: 'd5', title: 'Academy Campus', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800' },
  { _id: 'd6', title: 'Maritime Navigation Class', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800' },
  { _id: 'd7', title: 'Cadet Parade', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800' },
  { _id: 'd8', title: 'Port Visit', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800' },
  { _id: 'd9', title: 'GMDSS Radio Lab', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' },
  { _id: 'd10', title: 'Award Ceremony', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  { _id: 'd11', title: 'Library & Study Hall', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' },
  { _id: 'd12', title: 'Lifeboat Drill', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800' },
]

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index in filtered array
  const [lightboxList, setLightboxList] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/gallery')
        if (res.data.success && res.data.data.length > 0) {
          setPhotos(res.data.data)
        } else {
          setPhotos(DEFAULT_PHOTOS)
        }
      } catch {
        setPhotos(DEFAULT_PHOTOS)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category).filter(Boolean)))]
  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory)

  const openLightbox = (idx) => {
    setLightboxList(filtered)
    setLightbox(idx)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }
  const prevPhoto = () => setLightbox(i => (i - 1 + lightboxList.length) % lightboxList.length)
  const nextPhoto = () => setLightbox(i => (i + 1) % lightboxList.length)

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lightboxList])

  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600" alt="Gallery"
            className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="badge-blue mb-4">
              <FiCamera size={13} className="inline mr-1.5" />
              Photo Gallery
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Life at MSTI Maritime Academy
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed">
              A glimpse into training, campus life, events, and the vibrant community at MSTI — Sri Lanka's premier maritime training institution.
            </p>
          </div>
          {/* Stats row */}
          <div className="flex gap-8 mt-10">
            {[
              { value: `${photos.length}+`, label: 'Photos' },
              { value: categories.length - 1, label: 'Categories' },
              { value: '18+', label: 'Years' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-navy-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="bg-navy-900/60 border-y border-navy-800 sticky top-[72px] z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <FiFilter size={14} className="text-navy-500 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-navy-800 text-navy-400 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 opacity-60">
                    ({photos.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-navy-800/60 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <p className="text-navy-500 text-sm mb-6">
                Showing {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && ` in "${activeCategory}"`}
              </p>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {filtered.map((photo, i) => (
                  <AnimatedCard key={photo._id} delay={Math.min(i * 60, 400)}>
                    <div
                      onClick={() => openLightbox(i)}
                      className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer bg-navy-800 mb-4"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title || 'Gallery photo'}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {photo.title && (
                          <p className="text-white text-sm font-semibold leading-tight">{photo.title}</p>
                        )}
                        {photo.category && (
                          <span className="inline-block mt-1 text-[10px] bg-blue-600/80 text-white px-2 py-0.5 rounded-full">
                            {photo.category}
                          </span>
                        )}
                      </div>
                      {/* Zoom icon */}
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FiGrid size={14} className="text-white" />
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <FiCamera size={48} className="text-navy-600 mx-auto mb-4" />
                  <p className="text-navy-400">No photos in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && lightboxList[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}>
          {/* Close */}
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-10">
            <FiX size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs px-3 py-1 rounded-full">
            {lightbox + 1} / {lightboxList.length}
          </div>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-10">
            <FiChevronLeft size={24} />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4"
            onClick={e => e.stopPropagation()}>
            <img
              key={lightbox}
              src={lightboxList[lightbox].imageUrl}
              alt={lightboxList[lightbox].title || ''}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in fade-in duration-300"
            />
            {(lightboxList[lightbox].title || lightboxList[lightbox].description) && (
              <div className="text-center">
                {lightboxList[lightbox].title && (
                  <p className="text-white font-bold text-lg">{lightboxList[lightbox].title}</p>
                )}
                {lightboxList[lightbox].description && (
                  <p className="text-navy-300 text-sm mt-1">{lightboxList[lightbox].description}</p>
                )}
                {lightboxList[lightbox].category && (
                  <span className="inline-block mt-2 text-xs bg-blue-600/80 text-white px-3 py-1 rounded-full">
                    {lightboxList[lightbox].category}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-10">
            <FiChevronRight size={24} />
          </button>
        </div>
      )}

      <CTASection
        title="Experience MSTI in Person"
        subtitle="Visit our campus and see our world-class training facilities for yourself."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="About MSTI"
        secondaryTo="/about"
      />
    </div>
  )
}
