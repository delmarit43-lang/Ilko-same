import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-page">
      <section className="section" style={{ background: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Get In Touch</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Have questions about our treatments or international packages? Our team is here to help you.
          </p>
        </div>
      </section>

      <section className="section">
        <style>{`
          @media (max-width: 767px) {
            .contact-info-grid { gap: 1rem !important; }
            .contact-form-container { margin-top: 3rem; }
            .map-container { height: 250px !important; }
          }
        `}</style>
        <div className="container">
          <div className="grid grid-3 contact-info-grid" style={{ marginBottom: '4rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Phone size={24} style={{ margin: '0 auto' }} /></div>
              <h4 style={{ fontSize: '1.1rem' }}>Call Us</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>252634579898</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Mail size={24} style={{ margin: '0 auto' }} /></div>
              <h4 style={{ fontSize: '1.1rem' }}>Email Us</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ilko-same@gmail.com</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><MapPin size={24} style={{ margin: '0 auto' }} /></div>
              <h4 style={{ fontSize: '1.1rem' }}>Visit Us</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ilko-same, Hargeisa road one</p>
            </div>
          </div>

          <div className="grid grid-2">
            <div>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Send Us a Message</h2>
              {submitted && (
                <div style={{ padding: '1rem', background: '#dcfce3', color: '#166534', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  Your message has been sent successfully!
                </div>
              )}
              <form className="grid" style={{ gap: '1rem' }} onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <style>{`
                    @media (min-width: 640px) {
                      .form-row { grid-template-columns: 1fr 1fr !important; }
                    }
                  `}</style>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    <input name="name" value={formData.name} onChange={handleChange} required className="input" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} placeholder="Your Name" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} placeholder="Your Email" />
                  </div>
                </div>
                <input name="subject" value={formData.subject} onChange={handleChange} required className="input" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} placeholder="Subject" />
                <textarea name="message" value={formData.message} onChange={handleChange} required className="input" rows="4" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }} placeholder="Your Message"></textarea>
                <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }}>Send Message <MessageSquare size={18} /></button>
              </form>
            </div>
            <div className="contact-form-container">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Location & Hours</h2>
              <div className="grid" style={{ gap: '2rem' }}>
                <div className="map-container" style={{ 
                  width: '100%', 
                  height: '300px', 
                  background: 'var(--surface)', 
                  borderRadius: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)'
                }}>
                  <MapPin size={48} />
                </div>
                <div className="card" style={{ padding: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={20} color="var(--primary)" /> Working Hours
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Isniin - Jimce</span>
                      <span style={{ fontWeight: 600 }}>8:00 AM - 8:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Sabti</span>
                      <span style={{ fontWeight: 600 }}>10:00 AM - 4:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--error)' }}>
                      <span>Axad</span>
                      <span style={{ fontWeight: 600 }}>Emergency Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Button */}
      <a href="https://wa.me/252634579898" target="_blank" rel="noreferrer" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#25D366',
        color: 'white',
        padding: '1rem',
        borderRadius: '50%',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <MessageSquare size={32} />
      </a>
    </div>
  );
};

export default Contact;
