import React from 'react';
import { Star, Play, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Sarah Johnston', country: 'USA', text: 'Habraaca tallaalka ilkuhu wuxuu ahaa mid aan xanuun lahayn. Shaqaalaha Ilko-Same waa kuwo xirfad sare leh.', stars: 5 },
    { name: 'Dr. Ali Hassan', country: 'Somalia', text: 'Tiknoolajiyad aad u wanaagsan iyo jawi aad u nadiif ah. Aad baan ugu talinayaa qurxinta ilkaha.', stars: 5 },
    { name: 'James Wilson', country: 'UK', text: 'Waxaan badbaadiyay kumanaan doollar marka la barbar dhigo qiimaha UK, tayada shaqaduna aad bay u sii fiican tahay!', stars: 5 },
    { name: 'Elena Rossi', country: 'Italy', text: 'Kilinig aad u qurux badan iyo dhakhaatiir aad u naxariis badan. Carruurtaydu waxay jecel yihiin inay halkan u yimaadaan baaritaankooda.', stars: 5 },
  ];

  return (
    <div className="testimonials-page">
      <section className="section" style={{ background: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Sheekooyinka Guusha ee Bukaanadayada</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Ma jiraan wax naga farxiya oo ka badan inaan aragno bukaanadayada oo kalsooni ku dhoolacaddaynaya. Halkan ka dhageyso dadka aan daweynay.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {reviews.map((review, index) => (
              <div key={index} className="card" style={{ position: 'relative' }}>
                <Quote size={40} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#0ea5e910' }} />
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                  ))}
                </div>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>"{review.text}"</p>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{review.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Bukaanka ka yimid {review.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
