const services = [
  { num: '01', icon: '✦', title: 'Event Planning', desc: 'End-to-end coordination of your celebration — timelines, vendors, logistics — so you can be fully present on your special day.' },
  { num: '02', icon: '❋', title: 'Decorations', desc: 'Bespoke balloon arches, floral installations, and themed décor for weddings, birthdays, baptisms, holy communions, and more.' },
  { num: '03', icon: '◈', title: 'Photography', desc: 'Candid and artistic photography that captures every emotion, every glance, and every precious detail of your event.' },
  { num: '04', icon: '◇', title: 'Art Work', desc: 'Custom signage, backdrop art, and hand-crafted installations that give your event a one-of-a-kind visual identity.' },
  { num: '05', icon: '◉', title: 'Light & Sound', desc: 'Atmospheric lighting design and professional sound systems that set the perfect mood from the first song to the last dance.' },
  { num: '06', icon: '♪', title: 'DJ Services', desc: 'Professional DJs who read the room and keep the energy alive — from ceremony to celebration, every beat matters.' },
]

export default function Services() {
  return (
    <section id="services">
      <div className="services-intro">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">A Full Suite of<br />Event Excellence</h2>
        <div className="divider center" />
      </div>
      <div className="services-grid">
        {services.map(s => (
          <div className="service-card" key={s.num}>
            <span className="service-num">{s.num}</span>
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
