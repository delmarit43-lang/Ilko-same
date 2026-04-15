import React from 'react';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0', // Reduced padding for mobile
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      minHeight: 'auto', // Auto height for mobile
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Media query style for desktop hero padding */}
      <style>{`
        @media (min-width: 768px) {
          .hero { padding: 8rem 0 !important; min-height: 80vh !important; }
          .hero-content { text-align: left !important; }
          .hero-image-container { display: flex !important; }
        }
        @media (max-width: 767px) {
          .hero-content { text-align: center; }
          .hero-content p { margin-left: auto; margin-right: auto; }
          .hero-actions { justify-content: center; }
          .decorative-badge { display: none; }
        }
      `}</style>

      <div className="container grid grid-2" style={{ alignItems: 'center' }}>
        <div className="hero-content">
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            background: 'white', 
            color: 'var(--primary)', 
            borderRadius: '2rem', 
            fontSize: '0.875rem', 
            fontWeight: 600,
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            Welcome to Ilko-Same Dental Clinic
          </span>
          <h1 style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Your Smile, <br />
            <span style={{ color: 'var(--primary)' }}>Our Priority</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
            International standard dental care with modern equipment and experienced specialists. We make your visit comfortable and stress-free.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
              Book Now <Calendar size={20} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
              Contact Us <Phone size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            aspectRatio: '1/1', 
            background: 'white', 
            borderRadius: '2rem', 
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Dental Clinic" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Decorative badge */}
          <div className="decorative-badge" style={{ 
            position: 'absolute', 
            bottom: '-1rem', 
            right: '-1rem', 
            background: 'var(--secondary)', 
            color: 'white', 
            padding: '1.25rem', 
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 10
          }}>
            <p style={{ fontWeight: 700, fontSize: '1.25rem' }}>10k+</p>
            <p style={{ fontSize: '0.75rem' }}>Happy Patients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
