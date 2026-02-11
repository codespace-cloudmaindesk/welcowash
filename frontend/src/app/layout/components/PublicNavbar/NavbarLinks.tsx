
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/utils/utils';
import { navbarStyles as s } from './PublicNavbar.styles';

interface NavbarLinksProps {
  links: readonly { label: string; path: string }[];
  mobile?: boolean;              // Determines if we use mobile or desktop styles
  onLinkClick?: () => void;      // Optional callback for click events
}

export const NavbarLinks = ({ links, mobile = false, onLinkClick }: NavbarLinksProps) => {
  // Choose the wrapper <ul> class based on mobile or desktop
  const navClass = mobile ? s.mobileMenu.list : s.desktopNav;

  return (
    <ul className={navClass}>
      {links.map(({ label, path }) => (
        <li key={path}>
          <NavLink
            to={path}
            onClick={mobile ? onLinkClick : undefined}
            // clsx + twMerge handles conditional classes automatically
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                s.link.base,                 // Always applied
                mobile ? s.link.mobile : s.link.desktop,  // Mobile or desktop style
                isActive && s.link.active    // Only included if isActive === true
              )
            }
            aria-label={`Go to ${label}`}

          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
