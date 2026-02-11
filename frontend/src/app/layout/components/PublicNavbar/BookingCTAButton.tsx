import { cn } from "@/shared/lib/utils/utils";
import { navbarStyles as s } from './PublicNavbar.styles';

interface BookingCTAButtonProps {
    className?: string;
    onClick?: () => void;
}

export const BookingCTAButton = ({ className, onClick }: BookingCTAButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(s.cta, className)}
        >
            Book Now
        </button>
    );
};
