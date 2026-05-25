export default function Hero() {
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero">
      <div className="hero-ring" />
      <div className="hero-content">
        <div className="hero-tag">Belleville, Ontario</div>
        <h1 className="hero-title">We Make Your<br /><em>Moments</em><br />Unforgettable</h1>
        <p className="hero-sub">Event Planning · Decoration · Photography · DJ &amp; Sound</p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => scrollToSection('gallery')}>View Our Work</button>
          <button className="btn-outline" onClick={() => scrollToSection('contact')}>Contact Us</button>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  )
}
