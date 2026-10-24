import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, AlertCircle, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const statusConfig = {
  pending:   { label: 'Pending',   bg: '#fef9c3', color: '#854d0e' },
  confirmed: { label: 'Confirmed', bg: '#dcfce7', color: '#166534' },
  cancelled: { label: 'Cancelled', bg: '#fee2e2', color: '#991b1b' },
};

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setAppointments(data.data);
      else setError(data.message);
    } catch {
      setError('Failed to load appointments. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || user?.role !== 'doctor') { navigate('/login'); return; }
    fetchAppointments();
  }, [token, user, navigate]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const pending   = appointments.filter(a => a.status === 'pending').length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <RefreshCw size={36} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
      <p>Loading patient queue...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', background: 'var(--background)', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #10b981, #047857)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>🦷 ILKO-SAME CLINIC</div>
              <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.25rem' }}>Dr. {user?.name}</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Doctor Portal — Patient Appointment Queue</p>
            </div>
            <button onClick={fetchAppointments} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Patients', value: appointments.length, color: '#0ea5e9' },
            { label: 'Pending',        value: pending,             color: '#f59e0b' },
            { label: 'Confirmed',      value: confirmed,           color: '#10b981' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Appointments Table */}
        <div style={{ background: 'var(--surface)', borderRadius: '1.25rem', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={20} color="#10b981" />
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Patient Queue</h2>
          </div>

          {appointments.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>No appointments in the queue.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--background)' }}>
                    {['#', 'Patient', 'Service', 'Date', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => {
                    const sc = statusConfig[appt.status] || statusConfig.pending;
                    return (
                      <tr key={appt._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 600 }}>#{idx + 1}</td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ fontWeight: 600 }}>{appt.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{appt.email}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📞 {appt.phone}</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', background: '#0ea5e920', color: '#0369a1', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {appt.service}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={14} color="var(--primary)" /> {formatDate(appt.date)}
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span style={{ padding: '0.35rem 0.9rem', background: sc.bg, color: sc.color, borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                            {sc.label}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          {/* Doctor CAN update status but CANNOT delete */}
                          {appt.status !== 'confirmed' && appt.status !== 'cancelled' && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button onClick={() => updateStatus(appt._id, 'confirmed')}
                                disabled={updatingId === appt._id}
                                style={{ background: '#dcfce7', border: 'none', color: '#166534', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle size={14} /> Confirm
                              </button>
                              <button onClick={() => updateStatus(appt._id, 'cancelled')}
                                disabled={updatingId === appt._id}
                                style={{ background: '#fee2e2', border: 'none', color: '#dc2626', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <XCircle size={14} /> Decline
                              </button>
                            </div>
                          )}
                          {(appt.status === 'confirmed' || appt.status === 'cancelled') && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No action</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Doctor cannot see admin section */}
        <div style={{ marginTop: '1.5rem', background: '#f0fff4', border: '1px solid #bbf7d0', borderRadius: '1rem', padding: '1rem 1.5rem', color: '#166534', fontSize: '0.875rem' }}>
          <strong>🩺 Doctor Access:</strong> You can view all appointments and update their status. Contact messages and user management are restricted to Admin only.
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

export default DoctorDashboard;
