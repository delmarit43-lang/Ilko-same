import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'AI Agent', path: '/ai-agent' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      background: 'var(--surface)',
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)',
      padding: '0.75rem 0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🦷</span>
          ILKO-SAME
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* THE SINGLE THEME TOGGLE FOR ALL SCREENS */}
          <button 
            onClick={toggleTheme}
            className="btn" 
            style={{ 
              padding: '0.5rem', 
              borderRadius: '50%', 
              background: 'var(--border)', 
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop Navigation */}
          <div className="desktop-only">
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  style={{
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', alignItems: 'center' }}>
                <Link to="/appointment" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9375rem' }}>
                  Book Now
                </Link>
                <Link
                  to="/admin"
                  title="Admin Dashboard"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    background: location.pathname === '/admin' ? 'var(--primary)' : 'var(--border)',
                    color: location.pathname === '/admin' ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  <LayoutDashboard size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mobile-only">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: 'var(--text)', background: 'none', display: 'flex', alignItems: 'center' }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-only" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--surface)',
          padding: '1.5rem',
          borderTop: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 999
        }}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '0.5rem 0',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text)'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: 600, fontSize: '1.1rem',
              padding: '0.5rem 0',
              color: location.pathname === '/admin' ? 'var(--primary)' : 'var(--text)'
            }}
          >
            <LayoutDashboard size={18} /> Admin Dashboard
          </Link>
          <Link 
            to="/appointment" 
            onClick={() => setIsOpen(false)}
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
          >
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
