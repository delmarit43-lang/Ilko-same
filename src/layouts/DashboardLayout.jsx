import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  CreditCard, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  ChevronRight,
  MessageSquare,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleBase = user?.role || 'patient';

  const menuItems = {
    admin: [
      { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
      { name: 'Appointments', icon: Calendar, path: '/admin' },
      { name: 'Messages', icon: MessageSquare, path: '/admin' },
      { name: 'Users', icon: Users, path: '/admin' },
      { name: 'Payments', icon: CreditCard, path: '/payments' },
      { name: 'Profile', icon: User, path: '/profile' },
    ],
    doctor: [
      { name: 'Overview', icon: LayoutDashboard, path: '/doctor-dashboard' },
      { name: 'Patient Queue', icon: Users, path: '/doctor-dashboard' },
      { name: 'Schedule', icon: Calendar, path: '/doctor-dashboard' },
      { name: 'Payments', icon: CreditCard, path: '/payments' },
      { name: 'Profile', icon: User, path: '/profile' },
    ],
    patient: [
      { name: 'My Dashboard', icon: LayoutDashboard, path: '/patient-dashboard' },
      { name: 'Book Appointment', icon: Calendar, path: '/appointment' },
      { name: 'My Payments', icon: CreditCard, path: '/payments' },
      { name: 'Profile', icon: User, path: '/profile' },
    ]
  };

  const currentMenu = menuItems[roleBase] || menuItems.patient;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)', color: 'var(--text)' }}>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        style={{ 
          background: 'var(--surface)', 
          borderRight: '1px solid var(--border)',
          display: 'none',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="desktop-only"
      >
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '1rem' }}>
          {isSidebarOpen && (
            <Link to="/" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🦷</span> ILKO-SAME
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '0 0.75rem' }}>
          {currentMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '0.875rem 1rem', 
                  borderRadius: '0.75rem',
                  marginBottom: '0.25rem',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s ease',
                  justifyContent: isSidebarOpen ? 'flex-start' : 'center'
                }}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
                {isActive && isSidebarOpen && <motion.div layoutId="active" style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }} />}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.875rem 1rem', 
              borderRadius: '0.75rem',
              color: '#ef4444',
              background: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center'
            }}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ 
          height: '70px', 
          background: 'var(--surface)', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="mobile-only">
              <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', color: 'var(--text)' }}>
                <Menu size={24} />
              </button>
            </div>
            <div style={{ position: 'relative', display: 'none' }} className="desktop-only">
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                  padding: '0.5rem 1rem 0.5rem 2.5rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid var(--border)', 
                  background: 'var(--background)',
                  width: '300px'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ position: 'relative', background: 'none', color: 'var(--text-muted)' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--surface)' }} />
            </button>
            
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem', borderRadius: '2rem', border: '1px solid var(--border)', paddingRight: '1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="desktop-only">
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: '2rem', flex: 1 }}>
          {children}
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: '280px', background: 'var(--surface)', zIndex: 1001, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>🦷 ILKO-SAME</Link>
                <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', color: 'var(--text)' }}><X size={24} /></button>
              </div>
              <nav style={{ flex: 1 }}>
                {currentMenu.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1rem', 
                      borderRadius: '0.75rem',
                      marginBottom: '0.5rem',
                      color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
                      background: location.pathname === item.path ? 'var(--primary-light)' : 'transparent',
                      fontWeight: 600
                    }}
                  >
                    <item.icon size={22} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
              <button onClick={handleLogout} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: '#ef4444', fontWeight: 700, background: 'none', border: 'none', width: '100%', justifyContent: 'flex-start' }}>
                <LogOut size={22} /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
