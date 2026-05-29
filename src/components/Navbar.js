// src/components/Navbar.js
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const link = ({ isActive }) => isActive ? 'active' : '';

  return (
    <>
      <nav>
        <NavLink className="nav-logo" to="/">ES</NavLink>

        <ul className="nav-links">
          <li><NavLink to="/"         className={link}>Home</NavLink></li>
          <li><NavLink to="/skills"   className={link}>Skills</NavLink></li>
          <li><NavLink to="/projects" className={link}>Projects</NavLink></li>
          <li><NavLink to="/about"    className={link}>About</NavLink></li>
          <li><NavLink to="/contact"  className={link}>Contact</NavLink></li>
        </ul>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink to="/"         className={link}>Home</NavLink>
          <NavLink to="/skills"   className={link}>Skills</NavLink>
          <NavLink to="/projects" className={link}>Projects</NavLink>
          <NavLink to="/about"    className={link}>About</NavLink>
          <NavLink to="/contact"  className={link}>Contact</NavLink>
        </nav>
        <p className="mobile-menu-foot">© 2025 Eslam Samir</p>
      </div>
    </>
  );
}
