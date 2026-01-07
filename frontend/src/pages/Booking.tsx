import React, { useState } from 'react';
import { X, Calendar, MapPin, User, CheckCircle, Loader2 } from 'lucide-react';
import { createBooking } from '../services/api';
import { SERVICES, STATUS, PLACEHOLDERS, LABELS, SUCCESS_MESSAGES, ERROR_MESSAGES, DEFAULT_FORM_DATA, ServiceType } from './Booking.constants';
import * as S from './Booking.styles';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<typeof STATUS[keyof typeof STATUS]>(STATUS.IDLE);
  const [formData, setFormData] = useState<{
    name: string;
    date: string;
    service: ServiceType;
    location: string;
  }>(DEFAULT_FORM_DATA);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);

    try {
      await createBooking({
        serviceId: formData.service,
        date: formData.date,
        location: formData.location,
        contact: formData.name
      });
      setStatus(STATUS.SUCCESS);
      setTimeout(() => {
        onClose();
        setStatus(STATUS.IDLE);
        setFormData(DEFAULT_FORM_DATA);
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className={S.modalWrapper}>
      <div className={S.modalContainer}>
        {/* Header */}
        <div className={S.header}>
          <h2 className={S.headerTitle}>Book Your Wash</h2>
          <button onClick={onClose} className={S.closeButton}>
            <X className={S.iconSmall} />
          </button>
        </div>

        {/* Success View */}
        {status === STATUS.SUCCESS ? (
          <div className={S.successWrapper}>
            <div className={S.successIconWrapper}>
              <CheckCircle className={S.successIcon} />
            </div>
            <h3 className={S.successText}>{SUCCESS_MESSAGES.title}</h3>
            <p className="text-muted-foreground">{SUCCESS_MESSAGES.description(formData.date)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Service */}
            <div className={S.formGroup}>
              <label className={S.label}>{LABELS.service}</label>
              <select
                className={S.input}
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value as ServiceType })}
              >
                {SERVICES.map(s => (
                  <option key={s.value} className="bg-slate-900" value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className={S.formGroup}>
              <label className={S.label}>{LABELS.date}</label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${S.iconSmall}`} />
                <input
                  type="datetime-local"
                  required
                  className={`${S.inputWithIcon} scheme-dark`}
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div className={S.formGroup}>
              <label className={S.label}>{LABELS.location}</label>
              <div className="relative">
                <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${S.iconSmall}`} />
                <input
                  type="text"
                  placeholder={PLACEHOLDERS.location}
                  required
                  className={S.inputWithIcon}
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Name */}
            <div className={S.formGroup}>
              <label className={S.label}>{LABELS.name}</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${S.iconSmall}`} />
                <input
                  type="text"
                  placeholder={PLACEHOLDERS.name}
                  required
                  className={S.inputWithIcon}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Error */}
            {status === STATUS.ERROR && (
              <p className={S.errorMessage}>{ERROR_MESSAGES.bookingFailed}</p>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === STATUS.LOADING} className={S.button}>
              {status === STATUS.LOADING ? (
                <>
                  <Loader2 className={`${S.iconSmall} animate-spin`} /> Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;