import React from 'react';
import { Plane, Hotel, FileText, CreditCard, Ship, MapPin } from 'lucide-react';

const InternationalPatients = () => {
  const features = [
    { title: 'Airport Pickup', desc: 'Free shuttle service from the International Airport to your hotel or clinic.', icon: <Plane /> },
    { title: 'Hotel Partnerships', desc: 'Special discounted rates at premium hotels near our clinic locations.', icon: <Hotel /> },
    { title: 'Visa Assistance', desc: 'Formal documents and invitation letters provided for your medical visa application.', icon: <FileText /> },
    { title: 'Transparent Pricing', desc: 'Fixed price treatment packages with no hidden costs or fees.', icon: <CreditCard /> },
  ];

  return (
    <div className="international-patients-page">
      <section className="section" style={{ background: 'linear-gradient(rgba(14, 165, 233, 0.9), rgba(14, 165, 233, 0.9)), url("https://images.unsplash.com/photo-1544006659-f0b21884cb1d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Global Smile Destination</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
            High-quality dental care doesn't have to be expensive. Save up to 70% on treatments while receiving world-class care in our luxury clinic.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Concierge Services</h2>
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {React.cloneElement(feature.icon, { size: 48 })}
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Treatment Packages</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We offer all-inclusive packages designed to make your journey stress-free. From the moment you land, we take care of everything.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ color: 'var(--primary)' }}>Smile Makeover Package</h4>
                  <p style={{ fontSize: '0.875rem' }}>Includes: 10 Veneers, Professional Whitening, 3 nights Hotel stay.</p>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ color: 'var(--primary)' }}>Dental Implant Package</h4>
                  <p style={{ fontSize: '0.875rem' }}>Includes: Titanium Implant, Zirconia Crown, CT Scan, Medication.</p>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
               <div style={{ 
                borderRadius: '2rem', 
                overflow: 'hidden', 
                boxShadow: 'var(--shadow-lg)'
              }}>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" alt="International Care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalPatients;
