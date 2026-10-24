import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, image, link }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, overflow: 'hidden' }}>
      {image ? (
        <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ 
          width: '3.5rem', 
          height: '3.5rem', 
          background: '#0ea5e915', 
          color: 'var(--primary)', 
          borderRadius: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '2rem 2rem 0'
        }}>
          {icon}
        </div>
      )}
      <div style={{ padding: '0 2rem 2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: image ? '1.5rem' : 0 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>{description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={link || '/services'} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-muted)', 
            fontWeight: 500,
            fontSize: '0.875rem'
          }}>
            Learn More <ArrowRight size={16} />
          </Link>
          <Link to="/appointment" state={{ service: title }} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
