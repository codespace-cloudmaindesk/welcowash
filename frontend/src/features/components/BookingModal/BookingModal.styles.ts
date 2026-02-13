export const BookingModalStyles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200",
  container: "bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden",
  header: "p-6 border-b border-white/5 flex justify-between items-center bg-white/5",
  title: "text-xl font-heading font-bold text-white",
  closeButton: "p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white",
  form: "p-6 space-y-4",
  input: "w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors",
  textarea: "w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-[80px] resize-none focus:outline-none focus:border-primary/50 transition-colors",
  select: "w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors",
  button: "w-full bg-primary hover:bg-cyan-400 text-black font-bold py-4 rounded-xl mt-4 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
  successView: "p-12 text-center flex flex-col items-center animate-in zoom-in-95 duration-300",
};
