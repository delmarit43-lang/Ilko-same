import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home',         path: '/' },
    { name: 'About',        path: '/about' },
    { 
      name: 'Services',     
      path: '/services',
      dropdown: [
        { name: 'General Dentistry', path: '/services#general' },
        { name: 'Cosmetic Dentistry', path: '/services#cosmetic' },
        { name: 'Dental Implants', path: '/services#implants' },
        { name: 'Orthodontics', path: '/services#orthodontics' },
      ]
    },
    { name: 'Doctors',      path: '/doctors' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact',      path: '/contact' },
  ];

  return (
    <nav className="navbar" style={{
      position: 'sticky', top: 0,
      background: 'var(--surface)',
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)',
      padding: '0.75rem 0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🦷</span> ILKO-SAME
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn"
            style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--border)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop Nav */}
          <div className="desktop-only text-sm font-medium">
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {navLinks.map(link => (
                <div key={link.path} className="nav-item" style={{ position: 'relative' }}>
                  {link.dropdown ? (
                    <div className="dropdown-container">
                      <Link to={link.path} style={{ fontWeight: 500, color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {link.name} <span style={{ fontSize: '0.7rem' }}>▼</span>
                      </Link>
                      <div className="dropdown-menu">
                        {link.dropdown.map(subItem => (
                          <Link key={subItem.path} to={subItem.path} className="dropdown-item">
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} style={{ fontWeight: 500, color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/appointment" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9375rem' }}>
                Book Now
              </Link>
            </div>
          </div>

          <style>{`
            .dropdown-container {
              position: relative;
              padding: 0.5rem 0;
            }
            .dropdown-menu {
              position: absolute;
              top: 100%;
              left: 0;
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: var(--radius-md);
              box-shadow: var(--shadow-lg);
              min-width: 200px;
              opacity: 0;
              visibility: hidden;
              transform: translateY(10px);
              transition: var(--transition);
              display: flex;
              flex-direction: column;
              padding: 0.5rem;
              z-index: 1001;
            }
            .dropdown-container:hover .dropdown-menu {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }
            .dropdown-item {
              padding: 0.75rem 1rem;
              border-radius: var(--radius-sm);
              font-size: 0.9rem;
              color: var(--text);
            }
            .dropdown-item:hover {
              background: var(--border);
              color: var(--primary);
            }
          `}</style>

          {/* Mobile Hamburger */}
          <div className="mobile-only">
            <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--text)', background: 'none', display: 'flex', alignItems: 'center' }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-only" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface)', padding: '1.5rem',
          borderTop: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
          display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 999
        }}>
          {navLinks.map(link => (
            <div key={link.path}>
              <Link to={link.path} onClick={() => setIsOpen(false)}
                style={{ fontWeight: 600, fontSize: '1.1rem', display: 'block', padding: '0.5rem 0', color: location.pathname === link.path ? 'var(--primary)' : 'var(--text)' }}>
                {link.name}
              </Link>
              {link.dropdown && (
                <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>
                  {link.dropdown.map(subItem => (
                    <Link key={subItem.path} to={subItem.path} onClick={() => setIsOpen(false)}
                      style={{ fontSize: '0.95rem', color: 'var(--text-muted)', padding: '0.25rem 0' }}>
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/appointment" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}>
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
