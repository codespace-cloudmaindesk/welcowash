import { BookingFormData } from "../BookingModal.constants";
import { BookingModalStyles as s } from "../BookingModal.styles";

interface ScheduleStepProps {
    formData: BookingFormData;
    updateField: (field: keyof BookingFormData, value: string) => void;
}

export const ScheduleStep = ({ formData, updateField }: ScheduleStepProps) => {
    return (
        <div className={s.fieldGroup}>
            {/* Address */}
            <div className={s.field}>
                <label className={s.label}>Service Address</label>
                <input
                    type="text"
                    className={s.input}
                    placeholder="123 Main St, City, Zip"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                />
            </div>

            {/* Date and Time Row */}
            <div className={s.fieldRow}>
                <div className={s.field}>
                    <label className={s.label}>Pick Up Date</label>
                    <input
                        type="date"
                        className={s.input}
                        value={formData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                    />
                </div>
                <div className={s.field}>
                    <label className={s.label}>Time Slot</label>
                    <select
                        className={s.select}
                        value={formData.timeSlot}
                        onChange={(e) => updateField("timeSlot", e.target.value)}
                    >
                        <option value="">Select time...</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                    </select>
                </div>
            </div>

            {/* Vehicle Type and Service Type Row */}
            <div className={s.fieldRow}>
                <div className={s.field}>
                    <label className={s.label}>Vehicle Type</label>
                    <select
                        className={s.select}
                        value={formData.vehicleType}
                        onChange={(e) => updateField("vehicleType", e.target.value)}
                    >
                        <option value="">Select vehicle...</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                    </select>
                </div>
                <div className={s.field}>
                    <label className={s.label}>Service Type</label>
                    <select
                        className={s.select}
                        value={formData.serviceType}
                        onChange={(e) => updateField("serviceType", e.target.value)}
                    >
                        <option value="">Select service...</option>
                        <option value="exterior">Exterior Wash</option>
                        <option value="interior">Interior Detailing</option>
                        <option value="full">Full Service Package</option>
                        <option value="ceramic">Ceramic Coating</option>
                    </select>
                </div>
            </div>

            {/* Special Instructions */}
            <div className={s.field}>
                <label className={s.label}>Special Instructions (Optional)</label>
                <textarea
                    className={s.textarea}
                    placeholder="Gate code, parking info, special requests, etc."
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                />
            </div>
        </div>
    );
};
