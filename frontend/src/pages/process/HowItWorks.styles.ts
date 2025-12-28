import {
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const howItWorksStyles = {
  section: {
    wrapper: 'py-20 md:py-32 relative bg-background overflow-hidden',
    glow:
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' +
      'w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none',
    container: 'container mx-auto px-4 md:px-6 relative z-10',
  },

  header: {
    wrapper: 'max-w-3xl mx-auto text-center mb-16 md:mb-24',
    badge:
      'inline-flex items-center gap-2 px-4 py-2 rounded-full ' +
      'bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md ' +
      'text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6',
    badgeDot: 'w-1.5 h-1.5 rounded-full bg-primary animate-pulse',
    heading:
      'text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter',
    gradient:
      'text-transparent bg-clip-text bg-linear-to-r from-white to-white/50',
    subtitle:
      'text-lg text-muted-foreground/80 max-w-xl mx-auto font-light leading-relaxed',
  },

  flow: {
    wrapper:
      'flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4',
  },

  card: {
    wrapper:
      'group relative flex-1 w-full max-w-[320px] lg:max-w-none perspective-1000',
    inner:
      'relative z-10 flex flex-col items-center text-center p-8 rounded-4xl ' +
      'bg-white/5 border border-white/10 backdrop-blur-md transition-all ' +
      'duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-primary/30',
    gloss:
      'absolute inset-x-0 top-0 h-px bg-linear-to-r ' +
      'from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100',
    iconWrap: 'mb-8 relative',
    iconFrame:
      'w-24 h-24 rounded-3xl p-px transition-all duration-500 ' +
      'group-hover:scale-110 group-hover:rotate-6 shadow-2xl',
    iconInner:
      'w-full h-full bg-[#0B1120] rounded-[22px] flex items-center justify-center relative overflow-hidden',
    icon: 'w-10 h-10 text-white relative z-10',
    stepBadge:
      'absolute -top-4 -right-4 w-10 h-10 rounded-full bg-black/90 ' +
      'border border-white/15 flex items-center justify-center text-sm font-black text-white',
    title:
      'text-2xl font-bold mb-4 text-white tracking-tight ' +
      'group-hover:text-transparent group-hover:bg-clip-text ' +
      'group-hover:bg-linear-to-r group-hover:from-white group-hover:to-primary/80',
    desc:
      'text-muted-foreground text-sm leading-relaxed font-light tracking-wide',
    liveGlow: 'absolute inset-0 bg-primary/20 animate-pulse z-0',
  },

  arrow: {
    wrapper:
      'shrink-0 flex items-center justify-center py-4 lg:py-0 w-full lg:w-auto',
    mobile: 'lg:hidden text-primary/30',
    desktop: 'hidden lg:block text-primary/30',
  },

  gradients: {
    cyan: 'bg-linear-to-br from-cyan-400 to-blue-600',
    blue: 'bg-linear-to-br from-blue-500 to-indigo-600',
    violet: 'bg-linear-to-br from-violet-500 to-purple-600',
  },

  icons: {
    calendar: { component: Calendar, className: 'w-10 h-10 text-white' },
    location: { component: MapPin, className: 'w-10 h-10 text-white' },
    sparkles: { component: Sparkles, className: 'w-10 h-10 text-white' },
    check: { component: CheckCircle, className: 'w-10 h-10 text-white' },
  },
};
