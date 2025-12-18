import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'How it works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Enterprise', path: '/enterprise' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          WELCO<span>WASH</span>
        </NavLink>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => isActive ? styles.activeLink : undefined}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button className={styles.bookButton}>Book Now</button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => isActive ? styles.activeLink : undefined}
          >
            {link.label}
          </NavLink>
        ))}
        <button className={styles.bookButton}>Book Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
