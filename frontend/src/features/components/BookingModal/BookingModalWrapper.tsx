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
                className="bg-white w-full sm:max-w-lg md:max-w-xl max-h-[90vh] sm:max-h-[75vh] shadow-2xl relative flex flex-col
                   rounded-t-3xl sm:rounded-2xl sm:border sm:border-gray-200 overflow-hidden
                   pb-[env(safe-area-inset-bottom)] sm:pb-0"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
                {/* Drag Handle (Mobile Only) */}
                <div className="sm:hidden pt-3 pb-2 flex justify-center sticky top-0 bg-white z-10">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Close Button (Desktop) */}
                <button
                    onClick={onClose}
                    className="hidden sm:block absolute top-4 right-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    aria-label="Close booking modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
