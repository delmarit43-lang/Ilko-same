import React from 'react';
import { Award, Mail, Phone, Globe, User, UserRound } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    {
      name: 'Dr. Ahmed Ilko',
      spec: 'Founder & Maxillofacial Surgeon',
      exp: '15+ Years',
      langs: ['English', 'Somali', 'Arabic'],
      gender: 'male'
    },
    {
      name: 'Dr. Kaltuun Maxamed',
      spec: 'Orthodontic Specialist',
      exp: '10+ Years',
      langs: ['English', 'Somali'],
      gender: 'female'
    },
    {
      name: 'Dr. Yaxye Mustafe',
      spec: 'Cosmetic Dentist',
      exp: '8+ Years',
      langs: ['English', 'Somali'],
      gender: 'male'
    },
    {
      name: 'Dr. Elena Rossi',
      spec: 'Pediatric Dentist',
      exp: '12+ Years',
      langs: ['English', 'Somali'],
      gender: 'female'
    }
  ];

  return (
    <div className="doctors-page">
      <section className="section" style={{ background: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Meet Our Specialists</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Our team of internationally trained and certified dental professionals is dedicated to your oral health.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {doctors.map((doctor, index) => (
              <div key={index} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ 
                  aspectRatio: '1/1', 
                  background: doctor.gender === 'male' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(236, 72, 153, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: doctor.gender === 'male' ? '#0284c7' : '#db2777',
                  borderBottom: `1px solid ${doctor.gender === 'male' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`
                }}>
                  {doctor.gender === 'male' ? <User size={80} strokeWidth={1.5} /> : <UserRound size={80} strokeWidth={1.5} />}
                </div>
                <div style={{ padding: '2rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{doctor.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>{doctor.spec}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Award size={16} /> {doctor.exp} Experience
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Globe size={16} /> {doctor.langs.join(', ')}
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}><Mail size={16} /></button>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}><Phone size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Our Dental Philosophy</h2>
          <div className="grid grid-3">
            {[
              { title: 'Patient Centric', text: 'We tailor every treatment plan to the unique needs and comfort of the patient.' },
              { title: 'Continuous Learning', text: 'Our doctors regularly attend international conferences to stay updated.' },
              { title: 'Ethical Care', text: 'Transparency and honesty in every diagnosis and cost estimation.' }
            ].map((item, i) => (
              <div key={i} className="card">
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
