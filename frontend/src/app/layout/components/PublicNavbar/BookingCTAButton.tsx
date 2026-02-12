import { cn } from "@/shared/lib/utils/utils";
import { navbarStyles as s } from './PublicNavbar.styles';

interface BookingCTAButtonProps {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export const BookingCTAButton = ({ 
    className,
    onClick,
    disabled = false,
    type = "button",
 }: BookingCTAButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}       
            disabled={disabled}         
            className={cn(s.cta, disabled && s.ctaDisabled, className)}
            aria-label="Book an appointment"
            > Book Now
        </button>
    );
};
