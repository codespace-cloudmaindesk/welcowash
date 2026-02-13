export const BookingModalStyles = {
  // Modal structure
  overlay: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 sm:py-20",
  container: "flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto",

  // Header
  header: {
    wrapper: "mb-5 sm:mb-6 md:mb-7 bg-gradient-to-r from-[#1e2233] to-[#2a3044] p-4 sm:p-5 -mx-4 sm:-mx-5 md:-mx-6 -mt-4 sm:-mt-5 md:-mt-6 rounded-t-3xl sm:rounded-t-2xl",
    title: "text-xl sm:text-2xl font-bold text-white leading-tight",
    description: "text-xs sm:text-sm text-cyan-200 mt-2"
  },

  // Close button
  closeButton: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700",

  // Form structure
  form: "space-y-5 sm:space-y-6",
  fieldGroup: "space-y-4 sm:space-y-5",
  fieldRow: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5",
  field: "space-y-2.5",

  // Labels
  label: "block text-sm font-medium text-gray-800 mb-1.5",

  // Input fields
  input: "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all text-sm sm:text-base",
  textarea: "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 min-h-[90px] sm:min-h-[110px] resize-none text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all text-sm sm:text-base",
  select: "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all text-sm sm:text-base appearance-none cursor-pointer",

  // Confirmation step
  confirmation: {
    container: "bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200 space-y-5",
    header: "font-semibold text-base sm:text-lg flex items-center gap-2.5 text-gray-900 pb-3 border-b border-gray-200",
    icon: "w-5 h-5 text-green-600 flex-shrink-0",
    detailsGrid: "grid grid-cols-1 gap-y-3.5 text-sm",
    detailRow: "flex flex-col sm:flex-row sm:justify-between gap-1.5 sm:gap-3 py-2.5 border-b border-gray-100 last:border-0",
    detailLabel: "text-gray-500 text-xs sm:text-sm font-medium",
    detailValue: "font-medium text-gray-900 text-sm sm:text-base break-words",
    note: "pt-3 text-xs text-gray-500 italic bg-gray-100/50 p-3 rounded-lg mt-2"
  },

  // Navigation buttons
  navigation: {
    container: "flex gap-3 sm:gap-4 mt-5 sm:mt-6 border-t border-gray-200 pt-5 sm:pt-6",
    buttonBase: "flex items-center justify-center gap-2 rounded-xl font-semibold uppercase tracking-wider transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed",
    backButton: "px-4 sm:px-5 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-cyan-400 hover:text-cyan-600",
    continueButton: "ml-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-105 shadow-lg hover:shadow-cyan-400/50",
    icon: "w-4 h-4 sm:w-5 sm:h-5"
  },

  // Buttons (for reference, though navigation is in main component)
  button: "w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base",

  // Success view
  successView: "p-8 sm:p-12 text-center flex flex-col items-center animate-in zoom-in-95 duration-300",
};

export const StepIndicatorStyles = {
  // Container
  container: "relative w-full mb-7 sm:mb-8 px-2",

  // Progress tracks
  track: {
    background: "absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full -z-10",
    active: "absolute top-4 left-0 h-1 bg-black rounded-full -z-10"
  },

  // Steps container
  stepsWrapper: "flex justify-between items-start w-full",
  stepItem: "flex flex-col items-center relative group",

  // Circle/bubble
  circle: {
    base: "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-colors duration-200 z-10",
    active: "bg-black border-black text-white",
    completed: "bg-black border-black text-white",
    pending: "bg-white border-gray-200 text-gray-400"
  },

  // Icons and text
  checkIcon: "w-3 h-3 sm:w-4 sm:h-4",

  // Step labels
  labelWrapper: "absolute top-10 sm:top-11 w-24 sm:w-32 text-center",
  label: {
    base: "text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300",
    active: "text-black",
    inactive: "text-gray-400"
  }
};
