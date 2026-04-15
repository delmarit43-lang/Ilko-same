import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const PatientDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchMyAppointments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/appointments/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          setAppointments(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch your appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchMyAppointments();
  }, [token, navigate]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading your dashboard...</div>;

  return (
    <div className="container section" style={{ minHeight: '80vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here is your personal health dashboard at Ilko-Same.</p>
      </div>

      {error && <div style={{ color: 'var(--error)', background: '#fee2e2', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem' }}><AlertCircle size={16} /> {error}</div>}

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} color="var(--primary)" /> 
          My Appointments
        </h2>
        
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>You don't have any appointments yet.</p>
            <button onClick={() => navigate('/appointment')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Book Now</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {appointments.map(appt => (
              <div key={appt._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--background)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{appt.service}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <Clock size={16} />
                    {formatDate(appt.date)}
                  </div>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: '#dcfce7', color: '#166534', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Confirmed
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
