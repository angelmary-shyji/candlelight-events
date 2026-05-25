import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  { text: "A heartfelt thank you to Candlelight Events for making our son's first birthday and baptism truly magical! Every detail was perfect — from the stunning decor to the flawless planning. The team went above and beyond to make the day unforgettable.", author: "It's me Taniya", event: "★★★★★ Google Review" },
  { text: "I had an amazing experience working with Candle Lights for my daughter's holy communion. From start to finish, their team was professional, attentive, and incredibly friendly. They took care of every detail with such precision.", author: "Xaviar Abraham", event: "★★★★★ Google Review" },
  { text: "A huge thank you to @candle_lights for making my daughter Nevaeh's 3rd birthday so magical! The decorations were absolutely perfect, warm, elegant, and filled with love. Every little detail was beautifully done and created such a dreamy atmosphere.", author: "Bino Charly", event: "★★★★★ Google Review" },
  { text: "I recently attended an event organized by this team, and I was genuinely impressed! Every detail was thoughtfully planned — from the beautiful setup to the smooth flow of the entire event. The atmosphere was vibrant, the coordination was seamless.", author: "Sreerag Sreedharan", event: "★★★★★ Google Review" },
  { text: "Had a great time with the group! Everyone was friendly, engaged, and contributed positively. Looking forwarded to the next event!", author: "Bobin John", event: "★★★★★ Google Review" },
  { text: "I had the pleasure of attending one of their events, and it was nothing short of exceptional. The attention to detail, ambiance, and seamless execution were remarkable. I highly recommend them to anyone seeking a beautifully curated experience.", author: "Akhil Mahesh", event: "★★★★★ Google Review" },
  { text: "I recently attended the Candle Light Event and was absolutely blown away by the entire experience. The service was exceptional from start to finish — friendly, organized, and attentive to every detail.", author: "Jozen Edward", event: "★★★★★ Google Review" },
  { text: "We recently celebrated our boy's birthday, and the decoration was absolutely fantastic! Every detail was thoughtfully arranged, creating a fun and joyful atmosphere. The team was professional, punctual, and very creative. Our guests were amazed!", author: "Lini G Ouseph", event: "★★★★★ Google Review" },
  { text: "The decoration was very nice and colourful.", author: "Anjana Anand", event: "★★★★★ Google Review" },
  { text: "East or West, Candle Light is the Best!", author: "Anjana Raj", event: "★★★★★ Google Review" },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((i) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(i)
      setFading(false)
    }, 300)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const t = testimonials[current]

  return (
    <section id="testimonials">
      <div className="test-header">
        <div className="section-label">Client Love</div>
        <h2 className="section-title">Words from Our<br />Happy Families</h2>
        <div className="divider center" />
      </div>
      <div className="test-inner">
        <div className="test-quote">"</div>
        <div className={`test-content${fading ? ' fading' : ''}`}>
          <p className="test-text">{t.text}</p>
          <div className="test-author">{t.author}</div>
          <div className="test-event">{t.event}</div>
        </div>
        <div className="test-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
