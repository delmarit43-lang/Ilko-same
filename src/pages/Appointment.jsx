import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const Appointment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    service: 'General Dentistry',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Failed to submit appointment');
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      // Handle network error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={64} style={{ margin: '0 auto' }} />
        </div>
        <h1 style={{ marginBottom: '1rem' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
          Thank you, {formData.name}. We have received your request and will contact you shortly to confirm your preferred time.
        </p>
        <button onClick={() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', country: '', date: '', service: 'General Dentistry', message: '' });
        }} className="btn btn-primary" style={{ marginTop: '2rem', alignSelf: 'center' }}>
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="appointment-page" style={{ background: 'var(--surface)', padding: '5rem 0' }}>
      <div className="container">
        <div className="grid grid-2" style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', borderRadius: '2rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Book Your Visit</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Working Hours</h4>
                <p style={{ fontSize: '0.9375rem', opacity: 0.8 }}>Mon - Fri: 8:00 AM - 8:00 PM</p>
                <p style={{ fontSize: '0.9375rem', opacity: 0.8 }}>Sat: 10:00 AM - 4:00 PM</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Location</h4>
                <p style={{ fontSize: '0.9375rem', opacity: 0.8 }}>ilko-same, Hargeisa road one</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Emergency</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>252634579898</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '3rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
                  placeholder="John Doe"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
                    placeholder="+1 234 567"
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Preferred Date</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Service Needed</label>
                <select 
                  name="service" 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                >
                  <option>General Dentistry</option>
                  <option>Cosmetic Dentistry</option>
                  <option>Dental Implants</option>
                  <option>Orthodontics</option>
                  <option>Teeth Whitening</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message (Optional)</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
                  placeholder="Tell us about your dental needs..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Confirm Booking <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
