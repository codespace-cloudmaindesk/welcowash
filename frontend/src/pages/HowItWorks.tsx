import React from 'react';
import { Search, CalendarCheck, Navigation2, Sparkles } from 'lucide-react';

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Select Service",
    desc: "Choose from our range of wash packages. Schedule one-off or recurring washes.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: CalendarCheck,
    title: "Book Your Wash",
    desc: "Choose your preferred time and location. Our mobile unit comes to your doorstep.",
    color: "from-cyan-400 to-primary"
  },
  {
    icon: Navigation2,
    title: "Track in Real-Time",
    desc: "Watch your wash team approach with live GPS tracking. Get notified instantly.",
    color: "from-primary to-indigo-500",
    isLive: true,
    meta: "See team ETA & wash duration"
  },
  {
    icon: Sparkles,
    title: "Premium Shine",
    desc: "Inspect your spotless vehicle and enjoy that new car feeling, delivered.",
    color: "from-indigo-500 to-purple-500"
  }
];

import { checkBackendStatus } from '../services/api';

export const HowItWorks: React.FC = () => {
  // Verify Backend Connection on Mount
  React.useEffect(() => {
    checkBackendStatus().then(data => {
      console.log("🔌 Backend Status:", data);
    });
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Seamless Experience
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter leading-tight">
            HOW IT <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">WORKS</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto font-light leading-relaxed">
            Professional detailing delivered to your location in four simple steps.
          </p>
        </div>

        {/* Linear Process Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between relative gap-8 lg:gap-4">

          {PROCESS_STEPS.map((step, index) => (
            <React.Fragment key={index}>

              {/* Card */}
              <div className="group relative flex-1 w-full max-w-[320px] lg:max-w-none perspective-1000">
                <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.3)]">

                  {/* Creative Top Gloss Highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                  {/* Step Icon & Number */}
                  <div className="mb-8 relative">
                    <div className={`w-24 h-24 rounded-3xl bg-linear-to-br ${step.color} p-[1px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]`}>
                      <div className="w-full h-full bg-[#0B1120] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                        <step.icon className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110 relative z-10" />

                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Live Pulse */}
                        {step.isLive && (
                          <div className="absolute inset-0 bg-primary/20 animate-pulse z-0" />
                        )}
                      </div>
                    </div>

                    {/* Floating Step Badge */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-linear-to-br from-gray-900 to-black border border-white/15 flex items-center justify-center text-sm font-black text-white shadow-xl z-20 group-hover:scale-110 transition-transform group-hover:border-primary/50">
                      {index + 1}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white tracking-tight flex items-center gap-2 justify-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-primary/80 transition-all">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed font-light tracking-wide">
                    {step.desc}
                  </p>

                  {/* Live Tag */}
                  {step.isLive && (
                    <div className="absolute top-5 right-5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Aesthetic Arrows (Between Cards) */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="shrink-0 relative z-0 flex items-center justify-center py-4 lg:py-0 w-full lg:w-auto">
                  {/* Mobile Arrow (Down) */}
                  <div className="lg:hidden relative text-primary/30 py-2">
                    <svg className="w-6 h-16 overflow-visible" viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0V90" stroke="url(#gradient-arrow-mobile)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
                      <path d="M7 85L12 90L17 85" stroke="url(#gradient-arrow-mobile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="gradient-arrow-mobile" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                          <stop offset="50%" stopColor="rgba(6,182,212,0.8)" />
                          <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Desktop Arrow (Right) */}
                  <div className="hidden lg:block text-primary/30 group-hover:text-primary transition-colors duration-500 -ml-2 -mr-2 relative">
                    <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 12H90" stroke="url(#gradient-arrow)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                      <path d="M85 7L90 12L85 17" stroke="url(#gradient-arrow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="gradient-arrow" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                          <stop offset="50%" stopColor="rgba(6,182,212,0.8)" />
                          <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;