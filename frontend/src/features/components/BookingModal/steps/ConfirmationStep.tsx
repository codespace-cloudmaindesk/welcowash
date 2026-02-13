import { CheckCircle } from "lucide-react";
import { BookingFormData } from "../BookingModal.constants";
import { BookingModalStyles as s } from "../BookingModal.styles";

interface ConfirmationStepProps {
    formData: BookingFormData;
}

export const ConfirmationStep = ({ formData }: ConfirmationStepProps) => {
    return (
        <div className={s.confirmation.container}>
            <h3 className={s.confirmation.header}>
                <CheckCircle className={s.confirmation.icon} />
                Review Details
            </h3>

            <div className={s.confirmation.detailsGrid}>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Contact:</span>
                    <span className={s.confirmation.detailValue}>{formData.name}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Phone:</span>
                    <span className={s.confirmation.detailValue}>{formData.phone}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Email:</span>
                    <span className={s.confirmation.detailValue}>{formData.email}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Location:</span>
                    <span className={s.confirmation.detailValue}>{formData.address}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Date & Time:</span>
                    <span className={s.confirmation.detailValue}>{formData.date} at {formData.timeSlot}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Vehicle:</span>
                    <span className={s.confirmation.detailValue + " capitalize"}>{formData.vehicleType}</span>
                </div>
                <div className={s.confirmation.detailRow}>
                    <span className={s.confirmation.detailLabel}>Service:</span>
                    <span className={s.confirmation.detailValue + " capitalize"}>{formData.serviceType}</span>
                </div>
            </div>

            {formData.notes && (
                <div className={s.confirmation.note}>
                    Note: {formData.notes}
                </div>
            )}
        </div>
    );
};
