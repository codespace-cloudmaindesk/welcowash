import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Droplets } from 'lucide-react';
import { cn } from '../../../lib/utils/utils';
import { BookingModal } from '../../../pages/Booking';

import { NAV_LINKS } from './Navbar.constants';
import { navbarStyles as s } from './Navbar.styles';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const renderLinks = (mobile = false) =>
    NAV_LINKS.map(({ label, path }) => (
      <NavLink
        key={path}
        to={path}
        onClick={() => mobile && setIsMenuOpen(false)}
        className={({ isActive }) =>
          cn(
            s.link.base,
            mobile ? s.link.mobile : s.link.desktop,
            isActive && s.link.active
          )
        }
      >
        {label}
      </NavLink>
    ));

  return (
    <nav
      className={cn(
        s.layout.root,
        isScrolled ? s.layout.scrolled : s.layout.top
      )}
    >
      <div className={s.layout.inner}>
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className={s.logo.wrap}
          aria-label="Go to home page"
        >
          <div className={s.logo.icon}>
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className={s.logo.text}>
            WELCO<span className={s.logo.accent}>WASH</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <ul className={s.desktopNav}>{renderLinks()}</ul>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen((v: boolean) => !v)}
          className={s.hamburger.btn}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={cn(
              s.hamburger.line,
              isMenuOpen && 'rotate-45 translate-y-2'
            )}
          />
          <span
            className={cn(
              s.hamburger.line,
              s.hamburger.fade,
              isMenuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              s.hamburger.line,
              isMenuOpen && '-rotate-45 -translate-y-2'
            )}
          />
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            s.mobileMenu.base,
            isMenuOpen ? s.mobileMenu.open : s.mobileMenu.closed
          )}
        >
          {renderLinks(true)}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsBookingModalOpen(true);
            }}
            className={s.cta}>Book Now
          </button>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
