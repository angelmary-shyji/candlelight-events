import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

// ─────────────────────────────────────────────────────────────
// GALLERY ITEMS
// To add a new photo/video: drop the file into public/images/
// then add a new line below following the same format:
//   { label: 'Description shown in lightbox', src: '/images/filename.jpg', category: 'Category' }
//
// Naming convention for files:
//   <category>_p<partyNumber>_<photoIndex>.jpg   e.g. bday_p3_0.jpg
//   <category>_p<partyNumber>.MP4                e.g. bday_p3.MP4
//
// Categories: 'Bday' | 'Gender Reveal' | 'Wedding' | 'Holy Comm.' | 'Baptism' | 'Valakapp'
// ─────────────────────────────────────────────────────────────
const allItems = [

  // ── BIRTHDAY ───────────────────────────────────────────────
  // Party 1 — bday_p1_0.jpg, bday_p1_1.jpg, bday_p1_2.jpg
  { label: 'Birthday Party 1 — Decoration Setup',  src: '/images/bday_p1_0.jpg', category: 'Bday' },
  { label: 'Birthday Party 1 — Balloon Backdrop',  src: '/images/bday_p1_1.jpg', category: 'Bday' },
  { label: 'Birthday Party 1 — Full Room View',    src: '/images/bday_p1_2.jpg', category: 'Bday' },
  // Party 2 — bday_p2_0.jpg, bday_p2_1.jpg, bday_p2.MP4
  { label: 'Birthday Party 2 — Stage Setup',       src: '/images/bday_p2_0.jpg', category: 'Bday' },
  { label: 'Birthday Party 2 — Decoration Detail', src: '/images/bday_p2_1.jpg', category: 'Bday' },
  { label: 'Birthday Party 2 — Event Reel',        src: '/images/bday_p2.MP4',   category: 'Bday' },
  // Party 3 — bday_p3_0.jpg, bday_p3_1.jpg, bday_p3.MP4
  { label: 'Birthday Party 3 — Stage Setup',       src: '/images/bday_p3_0.jpg', category: 'Bday' },
  { label: 'Birthday Party 3 — Decoration Detail', src: '/images/bday_p3_1.jpg', category: 'Bday' },
  { label: 'Birthday Party 3 — Event Reel',        src: '/images/bday_p3.MP4',   category: 'Bday' },
  // Party 4 — bday_p4_0.jpg, bday_p4.MP4
  { label: 'Birthday Party 4 — Stage Setup',       src: '/images/bday_p4_0.jpg', category: 'Bday' },
  { label: 'Birthday Party 4 — Event Reel',        src: '/images/bday_p4.MP4',   category: 'Bday' },

  // ── GENDER REVEAL ──────────────────────────────────────────
  // Party 1 — genderReveal_p1_0.jpg, genderReveal_p1_1.jpg, genderReveal_p1_2.jpg, GenderReveal_p1.MP4
  { label: 'Gender Reveal — Balloon Setup',        src: '/images/genderReveal_p1_0.jpg', category: 'Gender Reveal' },
  { label: 'Gender Reveal — Decoration Detail',    src: '/images/genderReveal_p1_1.jpg', category: 'Gender Reveal' },
  { label: 'Gender Reveal — Full Venue View',      src: '/images/genderReveal_p1_2.jpg', category: 'Gender Reveal' },
  { label: 'Gender Reveal — Event Reel',           src: '/images/GenderReveal_p1.MP4',   category: 'Gender Reveal' },

  // ── WEDDING ────────────────────────────────────────────────
  // All from one wedding — wedding.jpg, wedding1.jpg, wedding2.jpg, weddingStage.jpg, weddingToast.jpg, weddindcar.jpg
  { label: 'Wedding — Outdoor Ceremony',           src: '/images/wedding.jpg',       category: 'Wedding' },
  { label: 'Wedding — Ceremony Setup',             src: '/images/wedding1.jpg',      category: 'Wedding' },
  { label: 'Wedding — Floral Arch',                src: '/images/wedding2.jpg',      category: 'Wedding' },
  { label: 'Wedding — Grand Stage',                src: '/images/weddingStage.jpg',  category: 'Wedding' },
  { label: 'Wedding — Toast Moment',               src: '/images/weddingToast.jpg',  category: 'Wedding' },
  { label: 'Wedding — Car Floral Decoration',      src: '/images/weddindcar.jpg',    category: 'Wedding' },

  // ── HOLY COMMUNION ─────────────────────────────────────────
  // Party 1 — holyCommunion_p1.jpg
  { label: 'Holy Communion Party 1 — Venue Setup', src: '/images/holyCommunion_p1.jpg',   category: 'Holy Comm.' },
  // Party 2 — holyCommunion_p2_0.jpg to _3.jpg, holyCommunion_p2.MP4
  { label: 'Holy Communion Party 2 — Stage View',  src: '/images/holyCommunion_p2_0.jpg', category: 'Holy Comm.' },
  { label: 'Holy Communion Party 2 — Decoration',  src: '/images/holyCommunion_p2_1.jpg', category: 'Holy Comm.' },
  { label: 'Holy Communion Party 2 — Balloon Arch',src: '/images/holyCommunion_p2_2.jpg', category: 'Holy Comm.' },
  { label: 'Holy Communion Party 2 — Full Setup',  src: '/images/holyCommunion_p2_3.jpg', category: 'Holy Comm.' },
  { label: 'Holy Communion Party 2 — Event Reel',  src: '/images/holyCommunion_p2.MP4',   category: 'Holy Comm.' },

  // ── BAPTISM ────────────────────────────────────────────────
  // Baptism_p1.jpg, Baptism_p2.jpg
  { label: 'Baptism — Decorated Venue',            src: '/images/Baptism_p1.jpg', category: 'Baptism' },
  { label: 'Baptism — Stage & Backdrop',           src: '/images/Baptism_p2.jpg', category: 'Baptism' },

  // ── VALAKAPP (Baby Shower) ─────────────────────────────────
  // Party 1 — valakapp_p1_0.jpg, valakapp_p1_1.jpg, valakapp_p1_2.jpg, valakapp_p1.MP4
  { label: 'Valakapp — Decoration Setup',          src: '/images/valakapp_p1_0.jpg', category: 'Valakapp' },
  { label: 'Valakapp — Stage & Floral Decor',      src: '/images/valakapp_p1_1.jpg', category: 'Valakapp' },
  { label: 'Valakapp — Full Venue View',           src: '/images/valakapp_p1_2.jpg', category: 'Valakapp' },
  { label: 'Valakapp — Event Reel',                src: '/images/valakapp_p1.MP4',   category: 'Valakapp' },
]

const highlights = [
  '/images/bday_p1_1.jpg',
  '/images/bday_p2_0.jpg',
  '/images/bday_p3_0.jpg',
  '/images/bday_p4_0.jpg',
  '/images/genderReveal_p1_0.jpg',
  '/images/weddingStage.jpg',
  '/images/holyCommunion_p1.jpg',
  '/images/holyCommunion_p2_0.jpg',
  '/images/Baptism_p1.jpg',
  '/images/valakapp_p1_0.jpg',
  '/images/weddingToast.jpg',
  '/images/genderReveal_p1_2.jpg',
]

const tabs = [
  { label: 'All',            value: 'All' },
  { label: 'Birthday',       value: 'Bday' },
  { label: 'Gender Reveal',  value: 'Gender Reveal' },
  { label: 'Wedding',        value: 'Wedding' },
  { label: 'Holy Communion', value: 'Holy Comm.' },
  { label: 'Baptism',        value: 'Baptism' },
  { label: 'Valakapp',       value: 'Valakapp' },
]

function isVideo(src) {
  return /\.(mp4|MP4|mov|MOV)$/.test(src)
}

function Lightbox({ items, index, onClose }) {
  const [current, setCurrent] = useState(index)

  const prev = useCallback(() => setCurrent(c => (c - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % items.length), [items.length])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [prev, next, onClose])

  const item = items[current]

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <button className="lightbox-arrow lightbox-prev" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        {isVideo(item.src) ? (
          <video src={item.src} controls autoPlay playsInline className="lightbox-video" />
        ) : (
          <img src={item.src} alt={item.label} />
        )}
      </div>
      <button className="lightbox-arrow lightbox-next" onClick={e => { e.stopPropagation(); next() }}>›</button>
      <div className="lightbox-counter">{current + 1} / {items.length}</div>
    </div>,
    document.body
  )
}

function GalleryItem({ item, index, onClick }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`g-item${isVideo(item.src) ? ' g-item--video' : ''}`}
      ref={ref}
      onClick={onClick}
      data-label={item.label}
    >
      {isVideo(item.src) ? (
        <video src={item.src} autoPlay muted loop playsInline />
      ) : (
        <img
          src={item.src}
          alt={item.label}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={e => e.target.classList.add('loaded')}
        />
      )}
    </div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = activeCategory === 'All'
    ? allItems.filter(i => highlights.includes(i.src))
    : allItems.filter(i => i.category === activeCategory)

  return (
    <section id="gallery">
      <div className="gallery-intro">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Moments We've<br />Brought to Life</h2>
        <div className="divider center" />
      </div>
      <div className="tabs-wrap">
        <div className="gallery-tabs">
          {tabs.map(t => (
            <button
              key={t.value}
              className={`tab${activeCategory === t.value ? ' active' : ''}`}
              onClick={() => setActiveCategory(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <GalleryItem
            key={item.src}
            item={item}
            index={i}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>
      <div className="gallery-cta">
        <p>See more on our Instagram</p>
        <a href="https://instagram.com/_candlelightevents" target="_blank" rel="noreferrer">
          <button className="btn-outline">@_candlelightevents</button>
        </a>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
