import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Loader, UserPlus, Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: 'patient', label: 'BUKAAN', icon: User, color: '#3b82f6', bg: '#eff6ff' },
    { id: 'doctor', label: 'DOCTOR', icon: Activity, color: '#10b981', bg: '#ecfdf5' },
    { id: 'admin', label: 'ADMIN', icon: ShieldCheck, color: '#8b5cf6', bg: '#f5f3ff' },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: selectedRole })
      });
      const data = await res.json();

      if (data.success) {
        login(data.data, data.data.token);
        
        // Redirect based on role
        if (data.data.role === 'admin') navigate('/admin');
        else if (data.data.role === 'doctor') navigate('/doctor-dashboard');
        else navigate('/patient-dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const activeRoleInfo = roles.find(r => r.id === selectedRole);

  return (
    <div style={{ 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '3rem 1rem',
      background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.5) 0%, rgba(255, 255, 255, 1) 100%)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: '550px', 
          width: '100%', 
          background: '#ffffff',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          padding: '2.5rem 2.5rem 1.5rem', 
          textAlign: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.04)'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: activeRoleInfo.bg, 
            borderRadius: '1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.25rem',
            color: activeRoleInfo.color,
            transition: 'all 0.3s ease'
          }}>
            <UserPlus size={30} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Select your role and join Ilko-Same Dental Clinic
          </p>
        </div>

        <div style={{ padding: '0rem 2.5rem 2.5rem' }}>
          {/* Role Selector Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            gap: '0.5rem',
            margin: '2rem 0',
            background: '#f8fafc',
            padding: '0.5rem',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => { setSelectedRole(role.id); setError(null); }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.875rem 0.5rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? role.color : '#64748b',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={22} style={{ color: isActive ? role.color : '#94a3b8' }} />
                  <span style={{ fontSize: '0.85rem' }}>{role.label}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ 
                color: '#dc2626', 
                background: '#fef2f2', 
                padding: '0.875rem 1rem', 
                borderRadius: '0.75rem', 
                marginBottom: '1.5rem', 
                fontSize: '0.875rem', 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #fecaca' 
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter your full name"
                  style={{ 
                    width: '100%', 
                    padding: '0.875rem 1rem 0.875rem 2.75rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #cbd5e1', 
                    background: '#ffffff', 
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = activeRoleInfo.color}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  style={{ 
                    width: '100%', 
                    padding: '0.875rem 1rem 0.875rem 2.75rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #cbd5e1', 
                    background: '#ffffff', 
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = activeRoleInfo.color}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Create a password"
                  style={{ 
                    width: '100%', 
                    padding: '0.875rem 1rem 0.875rem 2.75rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #cbd5e1', 
                    background: '#ffffff', 
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = activeRoleInfo.color}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                padding: '0.875rem', 
                marginTop: '1rem',
                background: activeRoleInfo.color,
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 14px 0 ${activeRoleInfo.color}40`,
                transition: 'all 0.2s',
                opacity: loading ? 0.8 : 1
              }}
            >
              {loading ? (
                <><Loader size={20} className="spinner" style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</>
              ) : (
                <>Sign Up as {activeRoleInfo.label} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
            Already have an account? {' '}
            <Link to="/login" style={{ color: activeRoleInfo.color, fontWeight: 700, textDecoration: 'none' }}>
              Sign in instead
            </Link>
          </div>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default Register;
