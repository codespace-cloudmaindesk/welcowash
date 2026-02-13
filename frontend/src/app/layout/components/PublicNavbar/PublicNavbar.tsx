import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils/utils";
import { useScroll } from "@/shared/lib/utils/hooks/useScroll";
import { useBodyLock } from "@/shared/lib/utils/hooks/useBodyLock";
import { HamburgerButton } from "./HamburgerButton";
import { NavbarLinks } from "./NavbarLinks";
import { SCROLL_THRESHOLD, PUBLIC_NAVBAR_LINKS } from "./PublicNavbar.constants";
import { BookingCTAButton } from "./BookingCTAButton";
import { navbarStyles as s } from "./PublicNavbar.styles";
import { Droplets } from "lucide-react";
import { BookingModal } from "@/features/components/BookingModal/BookingModal";

export const PublicNavbar = () => {
    const isScrolled = useScroll(SCROLL_THRESHOLD);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useBodyLock(isMenuOpen || isBookingModalOpen);


    return (
        <>
            <nav className={cn(
                s.layout.root,
                isScrolled ? s.layout.scrolled : s.layout.top
            )}>
                <div className={s.layout.inner}>
                    {/* Logo Area */}
                    <NavLink
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={s.logo.wrap}
                        aria-label="Go to home page"
                    >
                        <div className={s.logo.icon}>
                            <Droplets className={s.logo.droplets} />
                        </div>
                        <span className={s.logo.text}>
                            WELCO<span className={s.logo.accent}>WASH</span>
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <NavbarLinks links={PUBLIC_NAVBAR_LINKS} />



                    {/* Mobile Menu Button */}
                    <HamburgerButton
                        isOpen={isMenuOpen}
                        onClick={() => setIsMenuOpen(prev => !prev)}
                    />
                </div>

                {/* Mobile Menu */}
                <div className={cn(
                    s.mobileMenu.base,
                    isMenuOpen ? s.mobileMenu.open : s.mobileMenu.closed
                )}>
                    <NavbarLinks
                        links={PUBLIC_NAVBAR_LINKS}
                        mobile
                        onLinkClick={() => setIsMenuOpen(false)}
                    />
                    {/* Add spacing matching the list gap */}
                    <div className="mt-6">
                        <BookingCTAButton onClick={() => {
                            setIsMenuOpen(false);
                            setIsBookingModalOpen(true);
                        }} />
                    </div>
                </div>
            </nav>
            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
            />
        </>
    );
};

export default PublicNavbar;