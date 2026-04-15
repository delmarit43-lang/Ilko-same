import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import bracesImg from '../assets/braces.jfif';
import generalDentistryImg from '../assets/general-dental.png';

const Services = () => {
  const serviceCategories = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive care for your natural teeth and gums.',
      benefits: ['Routine Examinations', 'Digital X-rays', 'Professional Cleaning', 'Oral Cancer Screening'],
      image: generalDentistryImg
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Enhance the appearance of your smile with our aesthetic solutions.',
      benefits: ['Porcelain Veneers', 'Dental Bonding', 'Smile Makeovers', 'Gum Contouring'],
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Dental Implants',
      description: 'The gold standard for replacing missing teeth permanently.',
      benefits: ['Single Tooth Implants', 'Full Arch Replacement', 'Bone Grafting', 'Computer Guided Surgery'],
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Orthodontics Dental',
      description: 'Straighten your teeth with modern bracing systems.',
      benefits: ['Invisalign Clear Aligners', 'Traditional Braces', 'Retainers', 'Early Interceptive Care'],
      image: bracesImg
    }
  ];

  return (
    <div className="services-page">
      <section className="section" style={{ background: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our Dental Services</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            We offer a full spectrum of dental treatments using state-of-the-art technology and personalized care plans.
          </p>
        </div>
      </section>

      <section className="section">
        <style>{`
          @media (max-width: 767px) {
            .service-row { flex-direction: column !important; text-align: center; gap: 2rem !important; }
            .service-benefits { grid-template-columns: 1fr !important; text-align: left; }
            .service-image-container { order: -1; aspect-ratio: 4/3 !important; }
          }
        `}</style>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {serviceCategories.map((service, index) => (
            <div key={index} className="service-row" style={{ 
              display: 'flex', 
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', 
              gap: '4rem', 
              alignItems: 'center'
            }}>
              <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>{service.description}</p>
                <div className="service-benefits" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                  {service.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} color="var(--primary)" />
                      {benefit}
                    </div>
                  ))}
                </div>
                <Link to="/appointment" className="btn btn-primary">
                  Book This Service <Calendar size={18} />
                </Link>
              </div>
              <div className="service-image-container" style={{ flex: '1 1 400px' }}>
                <div style={{ 
                  borderRadius: '2rem', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-lg)',
                  aspectRatio: '16/10'
                }}>
                  <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready for a Healthier Smile?</h2>
          <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', opacity: 0.9 }}>Join thousands of satisfied patients who trust Ilko-Same.</p>
          <Link to="/appointment" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Schedule Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
