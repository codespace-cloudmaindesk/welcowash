import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { BookingModalStyles as s } from "./BookingModal.styles";

interface BookingModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const BookingModalWrapper = ({ isOpen, onClose, children }: BookingModalWrapperProps) => {
    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={s.overlay} onClick={onClose}>
            {/* Mobile: Bottom Sheet, Desktop: Centered Modal */}
            <motion.div
                className={s.wrapper.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
                {...s.animations.modalSlide}
            >
                {/* Drag Handle (Mobile Only) */}
                <div className={s.wrapper.dragHandle.container}>
                    <div className={s.wrapper.dragHandle.bar} />
                </div>

                {/* Close Button (Desktop) */}
                <button
                    onClick={onClose}
                    className={s.wrapper.closeButton.wrapper}
                    aria-label="Close booking modal"
                >
                    <X className={s.wrapper.closeButton.icon} />
                </button>

                {/* Modal Content - Scrollable */}
                <div className={s.wrapper.content}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
