import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useBookingForm } from "@/shared/lib/utils/hooks/useBookingForm";
import { StepIndicator } from "./StepIndicator";
import { BookingModalStyles as s } from "./BookingModal.styles"; // Your styles object
import { BOOKING_STEPS } from "./BookingModal.constants";

export const BookingModal = () => {
  const { 
    currentStepIndex, 
    stepData, 
    isFirstStep, 
    isLastStep, 
    isLoading, 
    nextStep, 
    prevStep, 
    formData, 
    updateField 
  } = useBookingForm();

  const renderStepContent = () => {
    switch (currentStepIndex) {
      case 0: // Service Selection
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Service Type</label>
            <select
              className={s.select} // Uses your style
              value={formData.serviceType}
              onChange={(e) => updateField("serviceType", e.target.value)}
            >
              <option value="">Select a service...</option>
              <option value="exterior">Exterior Wash</option>
              <option value="interior">Interior Detailing</option>
              <option value="full">Full Service Package</option>
              <option value="ceramic">Ceramic Coating</option>
            </select>
          </div>
        );

      case 1: // Date & Time
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date" 
                className={s.input} // Uses your style
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <select 
                className={s.select}
                value={formData.timeSlot}
                onChange={(e) => updateField("timeSlot", e.target.value)}
              >
                <option value="">Pick a time...</option>
                <option value="09:00">09:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>
          </div>
        );

      case 2: // Location
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Service Address</label>
              <input 
                type="text"
                className={s.input}
                placeholder="123 Main St, City, Zip"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Access Instructions (Optional)</label>
              <textarea 
                className={s.textarea}
                placeholder="Gate code, parking info, etc."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>
        );

      case 3: // Contact Information
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text"
                className={s.input}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="tel"
                  className={s.input}
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
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

      case 4: // Confirmation
        return (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
              <CheckCircle className="w-5 h-5 text-green-600" /> 
              Review Details
            </h3>
            
            <div className="grid grid-cols-1 gap-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Service:</span>
                <span className="font-medium text-gray-900 capitalize">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-900">{formData.date} at {formData.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium text-gray-900 text-right max-w-[200px] truncate">{formData.address}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Contact:</span>
                <span className="font-medium text-gray-900">{formData.name}</span>
              </div>
            </div>

            {formData.notes && (
               <div className="pt-2 text-xs text-gray-500 italic">
                  Note: {formData.notes}
               </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={s.container}>
      {/* 1. Progress Indicator */}
      <StepIndicator 
          currentStep={currentStepIndex + 1} 
          steps={BOOKING_STEPS} 
      />

      {/* 2. Header */}
      <div className={s.header.wrapper}>
        <h2 className={s.header.title}>{stepData.title}</h2>
        <p className={s.header.description}>{stepData.description}</p>
      </div>

      {/* 3. Form Content */}
      <div className="flex-1 min-h-[300px] py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Footer Buttons */}
      <div className="flex gap-3 mt-6 border-t pt-6">
        {!isFirstStep && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        
        <button
          type="button"
          onClick={nextStep}
          disabled={isLoading}
          className="ml-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : isLastStep ? (
            "Confirm Booking"
          ) : (
            <>
              Next Step <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};