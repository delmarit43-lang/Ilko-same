import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Activity, Beaker, ShieldCheck, Heart, UserRound, Award } from 'lucide-react';
import generalDentistryImg from '../assets/general-dental.png';

const Home = () => {
  const services = [
    { 
      title: 'General Dentistry', 
      description: 'Routine check-ups, cleanings, and preventative care.', 
      image: generalDentistryImg, 
      link: '/services' 
    },
    { 
      title: 'Cosmetic Dentistry', 
      description: 'Transform your smile with veneers and aesthetic treatments.', 
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
      link: '/services' 
    },
    { 
      title: 'Teeth Whitening', 
      description: 'Professional whitening for a brighter smile.', 
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop', 
      link: '/services' 
    },
    { 
      title: 'Dental Implants', 
      description: 'Permanent solutions for missing teeth.', 
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop', 
      link: '/services' 
    },
  ];

  return (
    <div className="home-page">
      <Hero />
      
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Specialized Services</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We provide a wide range of dental services using the latest technology to ensure the best results for our patients.
            </p>
          </div>
          <div className="grid grid-4">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <style>{`
          @media (max-width: 767px) {
            .testimonial-card { padding: 2rem 1.5rem !important; margin-top: 2rem; }
            .why-choose-title { font-size: 2rem !important; }
          }
        `}</style>
        <div className="container grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 className="why-choose-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Choose Ilko-Same?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: 'Experienced Specialists', desc: 'Our team consists of world-class doctors with international certifications.', icon: <UserRound /> },
                { title: 'Advanced Technology', desc: 'We use the latest digital dentistry tools for precise and painless treatments.', icon: <Activity /> },
                { title: 'International Standards', desc: 'Quality care that meets global hygiene and safety protocols.', icon: <Award /> },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonial-card" style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: '2rem', 
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Trusted by over 10,000+ patients worldwide</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9375rem' }}>"The best dental experience I've ever had. Professional, clean, and the results are amazing!"</p>
            <div style={{ fontWeight: 600 }}>- Sarah Johnston</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Patient from Florida, USA</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
