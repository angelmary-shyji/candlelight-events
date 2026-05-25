import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="logo">
        <img src="/images/logo.jpg" alt="Candlelight Events" className="logo-img" />
        <span>Candlelight Events</span>
      </div>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
        <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
        <li><a href="#testimonials" onClick={() => scrollToSection('testimonials')}>Testimonials</a></li>
        <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
      </ul>
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
