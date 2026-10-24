import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Settings, Key, Bell, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Please login to view your profile.</p>
    </div>
  );

  const roleColors = {
    admin: '#8b5cf6',
    doctor: '#10b981',
    patient: '#3b82f6'
  };

  const roleGradients = {
    admin: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    doctor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    patient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  };

  return (
    <div className="profile-page" style={{ 
      background: 'var(--background)',
      minHeight: '90vh',
      padding: '4rem 1rem'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            background: 'var(--surface)',
            borderRadius: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}
        >
          {/* Header Banner */}
          <div style={{ 
            height: '160px', 
            background: roleGradients[user.role],
            position: 'relative'
          }}></div>

          <div style={{ padding: '0 3rem 3rem', marginTop: '-60px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              gap: '2rem', 
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <div style={{ 
                width: '150px', 
                height: '150px', 
                background: 'white', 
                borderRadius: '3rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '5px'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: `${roleColors[user.role]}15`, 
                  borderRadius: '2.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: roleColors[user.role]
                }}>
                  <User size={70} />
                </div>
              </div>
              
              <div style={{ paddingBottom: '1rem', flex: 1 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {user.name}
                </h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ 
                    padding: '0.4rem 1.25rem', 
                    borderRadius: '2rem', 
                    background: `${roleColors[user.role]}15`, 
                    color: roleColors[user.role],
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Shield size={16} /> {user.role}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                    Member since {new Date().getFullYear()}
                  </span>
                </div>
              </div>

              <div style={{ paddingBottom: '1rem' }}>
                <button className="btn" style={{ 
                  background: 'var(--border)', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Settings size={18} /> Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-2" style={{ gap: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.75rem' }}>
                  Contact Information
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '0.5rem' }}>
                  <div style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '1rem' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>EMAIL ADDRESS</p>
                    <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>{user.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '0.5rem' }}>
                  <div style={{ color: roleColors[user.role], background: `${roleColors[user.role]}15`, padding: '0.75rem', borderRadius: '1rem' }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>ACCOUNT ID</p>
                    <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>#{user.id.substring(0, 12)}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.75rem' }}>
                  Quick Actions
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'Security', icon: Key, color: '#f59e0b' },
                    { label: 'Notifications', icon: Bell, color: '#ef4444' },
                    { label: 'Payments', icon: CreditCard, color: '#10b981' },
                    { label: 'Preferences', icon: Settings, color: '#6366f1' },
                  ].map((item, i) => (
                    <button key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1.5rem',
                      borderRadius: '1.5rem',
                      border: '1px solid var(--border)',
                      background: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-alt)'}
                       onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                      <item.icon size={24} style={{ color: item.color }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
