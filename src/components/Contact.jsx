import { useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', event: '', date: '', message: '' })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  fields.name,
          from_email: fields.email,
          event_type: fields.event,
          event_date: fields.date,
          message:    fields.message,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setFields({ name: '', email: '', event: '', date: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="contact-inner contact-inner--wide">
        <div className="section-label">Get in Touch</div>
        <h2 className="section-title">Let's Make It Happen</h2>
        <div className="divider center" />

        <div className="contact-layout">
          <div className="contact-items">
            <a className="contact-item" href="tel:+16136613423">
              <span className="c-icon">☎</span>
              <span className="c-text">+1 (613) 661-3423</span>
            </a>
            <a className="contact-item" href="tel:+16139707025">
              <span className="c-icon">☎</span>
              <span className="c-text">+1 (613) 970-7025</span>
            </a>
            <a className="contact-item" href="mailto:candlelightevents40@gmail.com">
              <span className="c-icon">✉</span>
              <span className="c-text">candlelightevents40@gmail.com</span>
            </a>
            <div className="contact-item">
              <span className="c-icon">◎</span>
              <span className="c-text">Belleville, Ontario, Canada</span>
            </div>
            <a className="contact-item" href="https://instagram.com/_candlelightevents" target="_blank" rel="noreferrer">
              <span className="c-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="c-text">@_candlelightevents</span>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="cf-row">
              <div className="cf-field">
                <label>Your Name</label>
                <input name="name" value={fields.name} onChange={handleChange} placeholder="Jane Smith" required />
              </div>
              <div className="cf-field">
                <label>Email Address</label>
                <input name="email" type="email" value={fields.email} onChange={handleChange} placeholder="jane@email.com" required />
              </div>
            </div>
            <div className="cf-row">
              <div className="cf-field">
                <label>Event Type</label>
                <select name="event" value={fields.event} onChange={handleChange} required>
                  <option value="" disabled>Select an event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Gender Reveal</option>
                  <option>Holy Communion</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="cf-field">
                <label>Event Date</label>
                <input name="date" type="date" value={fields.date} onChange={handleChange} />
              </div>
            </div>
            <div className="cf-field">
              <label>Message</label>
              <textarea name="message" value={fields.message} onChange={handleChange} rows={5} placeholder="Tell us about your event..." required />
            </div>

            {status === 'success' && (
              <p className="cf-success">Thank you! We'll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="cf-error">Something went wrong. Please try again or email us directly.</p>
            )}

            <button className="btn-gold cf-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
