import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, AlertCircle, Clock } from 'lucide-react';

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || user?.role !== 'doctor') {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/appointments', {
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
        setError('Failed to fetch clinic appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, user, navigate]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading your dashboard...</div>;

  return (
    <div className="container section" style={{ minHeight: '80vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dr. {user?.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Clinic Appointments Overview</p>
      </div>

      {error && <div style={{ color: 'var(--error)', background: '#fee2e2', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem' }}><AlertCircle size={16} /> {error}</div>}

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--primary)" /> 
          Patient Queue
        </h2>
        
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
             <p>No upcoming appointments found.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--background)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Patient Name</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Service</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Scheduled Date</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appt => (
                  <tr key={appt._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{appt.name}</td>
                    <td style={{ padding: '1rem' }}>
                       <span style={{ padding: '0.25rem 0.5rem', background: '#0ea5e920', color: '#0ea5e9', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {appt.service}
                       </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                         <Clock size={14} color="var(--primary)" /> {formatDate(appt.date)}
                       </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{appt.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
