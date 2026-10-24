import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageSquare, Mail, Phone, Clock, RefreshCw, ChevronDown, ChevronUp, AlertCircle, Globe, Trash2, CheckCircle, XCircle } from 'lucide-react';

const statusConfig = {
  pending:   { label: 'Pending',   bg: '#fef9c3', color: '#854d0e' },
  confirmed: { label: 'Confirmed', bg: '#dcfce7', color: '#166534' },
  cancelled: { label: 'Cancelled', bg: '#fee2e2', color: '#991b1b' },
};

const API = 'http://localhost:5000/api';

const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '1.25rem',
    padding: '1.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    boxShadow: 'var(--shadow-md)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
  >
    <div style={{
      width: 56, height: 56, borderRadius: '1rem',
      background: `${color}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{label}</div>
    </div>
  </div>
);

const Badge = ({ text, color }) => (
  <span style={{
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    background: `${color}20`,
    color
  }}>{text}</span>
);

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    setLoading(true);
    setError(null);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const [apptRes, contRes] = await Promise.all([
        fetch(`${API}/appointments`, { headers }),
        fetch(`${API}/contact`, { headers })
      ]);
      if (apptRes.status === 401 || contRes.status === 401) {
        setError('Your session has expired. Please login again.');
        return;
      }
      const apptData = await apptRes.json();
      const contData = await contRes.json();
      if (apptData.success) setAppointments(apptData.data);
      if (contData.success) setContacts(contData.data);
    } catch (err) {
      setError('Could not connect to backend. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch { setError('Failed to update status.'); }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment?')) return;
    try {
      const res = await fetch(`${API}/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setAppointments(prev => prev.filter(a => a._id !== id));
      else setError(data.message);
    } catch { setError('Failed to delete appointment.'); }
  };

  useEffect(() => { 
    if (!token || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token, user, navigate]);

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const serviceColors = {
    'General Dentistry': '#0ea5e9',
    'Cosmetic Dentistry': '#8b5cf6',
    'Dental Implants': '#f59e0b',
    'Orthodontics': '#10b981',
    'Teeth Whitening': '#f97316'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingBottom: '4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
        padding: '3rem 0 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '10%',
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem' }}>🦷</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontWeight: 500 }}>ILKO-SAME CLINIC</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>System Administrator</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem' }}>Manage all clinic data securely.</p>
            </div>
            <button
              onClick={fetchData}
              disabled={refreshing}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '0.75rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s',
                opacity: refreshing ? 0.7 : 1
              }}
            >
              <RefreshCw size={16} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 2 }}>
        <div className="grid grid-2" style={{ marginBottom: '2rem', gap: '1rem' }}>
          <StatCard icon={<Calendar size={26} />} label="Total Appointments" value={appointments.length} color="#0ea5e9" />
          <StatCard icon={<MessageSquare size={26} />} label="Total Messages" value={contacts.length} color="#8b5cf6" />
        </div>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '1rem',
            padding: '1rem 1.5rem', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontWeight: 500 }}>{error}</span>
          </div>
        )}

        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
          background: 'var(--surface)', borderRadius: '1rem',
          padding: '0.375rem', border: '1px solid var(--border)', width: 'fit-content'
        }}>
          {[
            { id: 'appointments', label: 'Appointments', icon: <Calendar size={16} />, count: appointments.length },
            { id: 'contacts', label: 'Messages', icon: <MessageSquare size={16} />, count: contacts.length }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: tab === t.id ? 'var(--primary)' : 'transparent',
                color: tab === t.id ? 'white' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.icon} {t.label}
              <span style={{
                background: tab === t.id ? 'rgba(255,255,255,0.25)' : 'var(--border)',
                color: tab === t.id ? 'white' : 'var(--text-muted)',
                padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem'
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <RefreshCw size={40} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
            <p style={{ fontWeight: 500 }}>Loading data from database...</p>
          </div>
        ) : (
          <>
            {tab === 'appointments' && (
              <div style={{ background: 'var(--surface)', borderRadius: '1.25rem', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar size={20} color="var(--primary)" />
                  <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Appointment Requests</h2>
                </div>
                {appointments.length === 0 ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontWeight: 500 }}>No appointments yet</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'var(--background)' }}>
                          {['#', 'Patient', 'Contact', 'Service', 'Date', 'Status', 'Actions'].map((h, i) => (
                            <th key={i} style={{
                              padding: '1rem 1.25rem', textAlign: 'left',
                              fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)',
                              textTransform: 'uppercase', letterSpacing: '0.05em',
                              borderBottom: '1px solid var(--border)'
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appt, idx) => (
                          <React.Fragment key={appt._id}>
                            <tr style={{
                              borderBottom: '1px solid var(--border)',
                              transition: 'background 0.15s',
                              background: expandedRow === appt._id ? 'var(--background)' : 'transparent'
                            }}
                            onMouseEnter={e => { if (expandedRow !== appt._id) e.currentTarget.style.background = 'var(--background)'; }}
                            onMouseLeave={e => { if (expandedRow !== appt._id) e.currentTarget.style.background = 'transparent'; }}
                            >
                              <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>#{idx + 1}</td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <div style={{
                                    width: 38, height: 38, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                                  }}>
                                    {appt.name?.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>{appt.name}</div>
                                    {appt.country && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={11} />{appt.country}</div>}
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}><Mail size={12} />{appt.email}</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={12} />{appt.phone}</div>
                                </div>
                              </td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                <Badge text={appt.service} color={serviceColors[appt.service] || '#0ea5e9'} />
                              </td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                                  <Clock size={14} color="var(--primary)" />
                                  {formatDate(appt.date)}
                                </div>
                              </td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                {(() => { const sc = statusConfig[appt.status] || statusConfig.pending; return (
                                  <span style={{ padding: '0.35rem 0.9rem', background: sc.bg, color: sc.color, borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>{sc.label}</span>
                                ); })()}
                              </td>
                              <td style={{ padding: '1rem 1.25rem' }}>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                  {appt.status === 'pending' && (
                                    <>
                                      <button onClick={() => updateStatus(appt._id, 'confirmed')} title="Confirm"
                                        style={{ background: '#dcfce7', border: 'none', color: '#166534', padding: '0.35rem 0.5rem', borderRadius: '0.4rem', cursor: 'pointer' }}>
                                        <CheckCircle size={14} />
                                      </button>
                                      <button onClick={() => updateStatus(appt._id, 'cancelled')} title="Decline"
                                        style={{ background: '#fef9c3', border: 'none', color: '#854d0e', padding: '0.35rem 0.5rem', borderRadius: '0.4rem', cursor: 'pointer' }}>
                                        <XCircle size={14} />
                                      </button>
                                    </>
                                  )}
                                  <button onClick={() => deleteAppointment(appt._id)} title="Delete permanently"
                                    style={{ background: '#fee2e2', border: 'none', color: '#dc2626', padding: '0.35rem 0.5rem', borderRadius: '0.4rem', cursor: 'pointer' }}>
                                    <Trash2 size={14} />
                                  </button>
                                  <button onClick={() => setExpandedRow(expandedRow === appt._id ? null : appt._id)}
                                    style={{ background: 'var(--border)', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                    {expandedRow === appt._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expandedRow === appt._id && (
                              <tr style={{ background: 'var(--background)' }}>
                                <td colSpan={7} style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border)' }}>
                                  <div style={{ background: 'var(--surface)', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Patient Message:</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>{appt.message || <em style={{ color: 'var(--text-muted)' }}>No message provided.</em>}</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === 'contacts' && (
              <div style={{ background: 'var(--surface)', borderRadius: '1.25rem', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MessageSquare size={20} color="#8b5cf6" />
                  <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Contact Messages</h2>
                </div>
                {contacts.length === 0 ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <MessageSquare size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ fontWeight: 500 }}>No messages yet</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {contacts.map((msg, idx) => (
                      <div key={msg._id} style={{
                        padding: '1.5rem 2rem',
                        borderBottom: idx < contacts.length - 1 ? '1px solid var(--border)' : 'none',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: 42, height: 42, borderRadius: '50%',
                              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0
                            }}>
                              {msg.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text)' }}>{msg.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Mail size={12} />{msg.email}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{formatDateTime(msg.createdAt)}</div>
                            <Badge text={msg.subject} color="#8b5cf6" />
                          </div>
                        </div>
                        <div style={{
                          background: 'var(--background)',
                          borderRadius: '0.75rem', padding: '1rem 1.25rem',
                          border: '1px solid var(--border)', color: 'var(--text)',
                          fontSize: '0.9rem', lineHeight: 1.7
                        }}>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
