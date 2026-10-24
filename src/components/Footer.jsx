import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" style={{ background: 'var(--surface)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <style>{`
          @media (max-width: 767px) {
            .footer-bottom { flex-direction: column !important; gap: 1rem; text-align: center; }
            .footer-links { justify-content: center; }
          }
        `}</style>
        <div className="grid grid-4">
          <div>
            <Link to="/" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)', display: 'block', marginBottom: '1.5rem' }}>
              ILKO-SAME
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              A world-class dental clinic providing premium care for international and local patients.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/doctors">Our Doctors</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/appointment" style={{ color: 'var(--primary)', fontWeight: 600 }}>Book Appointment</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/services#general">General Dentistry</Link></li>
              <li><Link to="/services#cosmetic">Cosmetic Dentistry</Link></li>
              <li><Link to="/services#implants">Dental Implants</Link></li>
              <li><Link to="/services#orthodontics">Orthodontics</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} /> +252 ...
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> ilko-same@gmail.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} /> ilko-same, Hargeisa road one
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <p>&copy; 2026 Ilko-Same Dental Clinic. All rights reserved.</p>
          <div className="footer-links" style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
