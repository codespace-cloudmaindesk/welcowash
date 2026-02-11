import { cn } from '@/shared/lib/utils/utils';
import { navbarStyles as s } from './PublicNavbar.styles';

interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

export const HamburgerButton = ({ isOpen, onClick, className }: HamburgerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(s.hamburger.btn, className)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            <div className={cn(s.hamburger.line, isOpen && s.hamburger.rotate)} />
            <div className={cn(s.hamburger.line, isOpen && "opacity-0")} />
            <div className={cn(s.hamburger.line, isOpen && s.hamburger.rotateInverse)} />
        </button>
    );
};
