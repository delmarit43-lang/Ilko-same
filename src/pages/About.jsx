import React from 'react';
import { Target, Eye, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      <section className="section" style={{ background: 'var(--surface)' }}>
        <style>{`
          @media (max-width: 767px) {
            .about-hero-grid { text-align: center; }
            .about-hero-image { margin-top: 2rem; }
            .standard-grid { gap: 1rem !important; }
          }
        `}</style>
        <div className="container">
          <div className="grid grid-2 about-hero-grid" style={{ alignItems: 'center' }}>
            <div>
              <h1 style={{ marginBottom: '1.5rem' }}>Setting the Standard in Dental Care</h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Founded in 2010, Ilko-Same Dental Clinic has grown from a local practice to an international destination for dental tourism and premium oral healthcare.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                Our mission is to provide high-quality dental care in a comfortable and friendly environment, using the best technology available today.
              </p>
            </div>
            <div className="about-hero-image" style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" alt="Clinic Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3" style={{ textAlign: 'center' }}>
            <div className="card">
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Target size={40} style={{ margin: '0 auto' }} /></div>
              <h3>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>To transform lives by creating beautiful, healthy smiles through exceptional dental care.</p>
            </div>
            <div className="card">
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Eye size={40} style={{ margin: '0 auto' }} /></div>
              <h3>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>To be the leading international dental provider recognized for innovation and compassion.</p>
            </div>
            <div className="card">
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Shield size={40} style={{ margin: '0 auto' }} /></div>
              <h3>Our Values</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Excellence, Integrity, Patient Care, and Continuous Improvement in all we do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>International Standards</h2>
          <div className="grid grid-2 standard-grid">
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users color="var(--primary)" size={20} /> Global Patient Care
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>We welcome patients from over 50 countries, providing support in multiple languages and travel assistance.</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield color="var(--primary)" size={20} /> Sterilization Protocols
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Our clinic follows strict international sterilization and hygiene protocols (ISO certified).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
