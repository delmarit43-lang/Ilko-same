import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, AlertCircle, X, CreditCard } from 'lucide-react';
import api from '../lib/axios';

const statusConfig = {
  pending:   { label: 'Pending',    bg: '#fef9c3', color: '#854d0e' },
  confirmed: { label: 'Confirmed',  bg: '#dcfce7', color: '#166534' },
  cancelled: { label: 'Cancelled',  bg: '#fee2e2', color: '#991b1b' },
};

const PatientDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyAppointments = async () => {
    try {
      const res = await api.get('/appointments/me');
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to load your appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchMyAppointments();
  }, [token, navigate]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const res = await api.delete(`/appointments/me/${id}`);
      if (res.data.success) {
        setAppointments(prev => prev.filter(a => a._id !== id));
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError(err.response?.data?.message || 'Failed to cancel appointment.');
    }
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return (
    <div style={{ minHeight: '80vh', background: 'var(--background)', paddingBottom: '4rem' }}>
      <div className="dashboard-header">
        <div className="container">
          <div className="skeleton skeleton-text" style={{ width: '100px', marginBottom: '0.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '250px', height: '2rem', marginBottom: '0.25rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
          <div className="skeleton skeleton-card"></div>
          <div className="skeleton skeleton-card"></div>
          <div className="skeleton skeleton-card"></div>
          <div className="skeleton skeleton-card"></div>
        </div>
        
        <div className="dashboard-list">
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
            <div className="skeleton skeleton-text" style={{ width: '150px', height: '1.5rem' }}></div>
          </div>
          <div style={{ padding: '1.5rem 2rem' }}>
            <div className="skeleton skeleton-appointment"></div>
            <div className="skeleton skeleton-appointment"></div>
            <div className="skeleton skeleton-appointment"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', background: 'var(--background)', paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>🦷 ILKO-SAME</div>
              <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.25rem' }}>Welcome, {user?.name}!</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Your personal health dashboard</p>
            </div>
            <Link to="/appointment" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '0.75rem 1.5rem', backdropFilter: 'blur(4px)' }}>
              + Book New Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
          {[
            { label: 'Total Appointments', value: appointments.length, color: '#0ea5e9' },
            { label: 'Confirmed',  value: appointments.filter(a => a.status === 'confirmed').length,  color: '#10b981' },
            { label: 'Pending',    value: appointments.filter(a => a.status === 'pending').length,    color: '#f59e0b' },
          ].map(stat => (
            <div key={stat.label} className="dashboard-stat-card">
              <div className="dashboard-stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}

          {/* New Make a Payment Quick Action */}
          <Link to="/payments" style={{ textDecoration: 'none' }}>
            <div className="dashboard-stat-card" style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, #0369a1 100%)', 
              color: 'white', 
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <CreditCard size={28} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Make a Payment</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>Secure via EVC/ZAAD</div>
            </div>
          </Link>
        </div>

        {/* Appointments */}
        <div className="dashboard-list">
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>My Appointments</h2>
          </div>
          
          {appointments.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontWeight: 500, marginBottom: '1rem' }}>No appointments yet</p>
              <Link to="/appointment" className="btn btn-primary">Book Your First Appointment</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {appointments.map((appt) => {
                const sc = statusConfig[appt.status] || statusConfig.pending;
                return (
                  <div key={appt._id} className="appointment-item">
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{appt.service}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <Clock size={14} /> {formatDate(appt.date)}
                      </div>
                      {appt.message && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>"{appt.message}"</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="status-badge" style={{ background: sc.bg, color: sc.color }}>
                        {sc.label}
                      </span>
                      {appt.status === 'pending' && (
                        <button onClick={() => handleCancel(appt._id)}
                          style={{ background: '#fee2e2', border: 'none', color: '#dc2626', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <X size={14} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Info box - things patient CANNOT see */}
        <div style={{ marginTop: '1.5rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '1rem', padding: '1rem 1.5rem', color: '#0369a1', fontSize: '0.875rem' }}>
          <strong>ℹ️ Privacy Notice:</strong> Only your own appointments are visible here. Your data is kept private and secure.
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
