import { BookingFormData } from "../BookingModal.constants";
import { BookingModalStyles as s } from "../BookingModal.styles";

interface YourInfoStepProps {
    formData: BookingFormData;
    updateField: (field: keyof BookingFormData, value: string) => void;
}

export const YourInfoStep = ({ formData, updateField }: YourInfoStepProps) => {
    return (
        <div className={s.fieldGroup}>
            <div className={s.field}>
                <label className={s.label}>Full Name</label>
                <input
                    type="text"
                    className={s.input}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />
            </div>
            <div className={s.fieldRow}>
                <div className={s.field}>
                    <label className={s.label}>Phone</label>
                    <input
                        type="tel"
                        className={s.input}
                        placeholder="(+27) 876-543-1210"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                    />
                </div>
                <div className={s.field}>
                    <label className={s.label}>Email</label>
                    <input
                        type="email"
                        className={s.input}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
