import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Droplets } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'How it works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Enterprise', path: '/enterprise' },
];

// Reusable Tailwind classes
const linkBase ='transition-all duration-300 relative font-semibold uppercase tracking-wider';
const linkDesktop ='text-sm after:content-[""] after:block after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500 after:w-0 hover:after:w-full';
const linkMobile =`text-xl text-gray-300 hover:text-cyan-400 hover:scale-105 transition-transform transition-colors duration-300hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]`;
const buttonBase ='bg-gradient-to-r from-blue-500 to-cyan-400 text-white uppercase font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll listener with requestAnimationFrame for performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const renderLinks = (isMobile = false) =>
    NAV_LINKS.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={({ isActive }) =>
          `${linkBase} ${isMobile ? linkMobile : linkDesktop
          } ${isActive ? (isMobile ? 'text-white' : 'text-white') : ''}`
        }

      >
        {link.label}
      </NavLink>
    ));

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'h-16 bg-[#1e2233]/70 backdrop-blur-md shadow-lg'
        : 'h-24 bg-transparent'
        }`}
    >
      <div className="max-w-[1400px] w-[92%] mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <NavLink to="/" 
            aria-label="Go to home page"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `group flex items-center gap-3 select-none ${isActive ? 'opacity-100' : 'opacity-90' }`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
               WELCO<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">WASH</span>
            </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-9">{renderLinks()}</ul>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col lg:hidden gap-1.5 cursor-pointer z-50 focus:outline-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
          />
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 w-full h-screen bg-[#1e2233]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:hidden`}
        >
          {renderLinks(true)}
          <button className={buttonBase}>Book Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
