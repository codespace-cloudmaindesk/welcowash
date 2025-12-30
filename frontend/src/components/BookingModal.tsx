import React, { useState } from 'react';
import { X, Calendar, MapPin, User, CheckCircle, Loader2 } from 'lucide-react';
import { createBooking } from '../services/api';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        client_name: '',
        contact_number: '',
        email: '',
        scheduled_datetime: '',
        service_id: 'Premium Wash',
        client_address: '',
        vehicle_category: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await createBooking({
                service_id: formData.service_id,
                scheduled_datetime: formData.scheduled_datetime,
                client_address: formData.client_address,
                vehicle_category: formData.vehicle_category,
                client_name: formData.client_name,
                contact_number: formData.contact_number,
                email: formData.email
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ client_name: '', contact_number: '', email: '', scheduled_datetime: '', service_id: 'Premium Wash', client_address: '', vehicle_category: '' });
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-heading font-bold text-white">Book Your Wash</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Success View */}
                {status === 'success' ? (
                    <div className="p-12 text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                        <p className="text-muted-foreground">We'll see you on {formData.scheduled_datetime}.</p>
                    </div>
                ) : (
                    /* Form View */
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Service</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                value={formData.service_id}
                                onChange={e => setFormData({ ...formData, service_id: e.target.value })}
                            >
                                <option className="bg-slate-900" value="Premium Wash">Premium Hand Wash</option>
                                <option className="bg-slate-900" value="Interior Detail">Interior Detail</option>
                                <option className="bg-slate-900" value="Full Service">Full Service</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date & Time</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white focus:outline-none focus:border-primary/50 transition-colors scheme-dark"
                                    value={formData.scheduled_datetime}
                                    onChange={e => setFormData({ ...formData, scheduled_datetime: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="123 Main St, Sandton"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                                    value={formData.client_address}
                                    onChange={e => setFormData({ ...formData, client_address: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                                    value={formData.client_name}
                                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Phone Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    placeholder="081-234-5678"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                                    value={formData.contact_number}
                                    onChange={e => setFormData({ ...formData, contact_number: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Vehicle Type</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Sedan, SUV, etc."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                                    value={formData.vehicle_category}
                                    onChange={e => setFormData({ ...formData, vehicle_category: e.target.value })}
                                />
                            </div>
                        </div>


                        {status === 'error' && (
                            <p className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded-lg">
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-primary hover:bg-cyan-400 text-white font-bold py-4 rounded-xl mt-4 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
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