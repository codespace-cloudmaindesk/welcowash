import { ArrowRight, Play } from 'lucide-react';

export const homeStyles = {
  container: 'relative w-full min-h-screen bg-background',
  hero: 'relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-32 pb-10',
  spotlight: 'absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent z-0',
  heroGradientOverlay: 'absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-background to-transparent z-10',
  heroContent: 'relative z-10 flex flex-col items-center justify-center px-4',

  heading: 'text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-4 tracking-tighter leading-[1.1] animate-slide-up',
  gradientText: 'text-gradient',
  subtitle: 'text-lg md:text-xl text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-slide-up leading-relaxed',

  ctaWrapper: 'flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10 md:mb-20 animate-slide-up',

  buttons: {
    book: {
      className: 'w-full sm:w-auto min-w-[200px]',
      size: 'xl',
      variant: 'hero',
      contentWrapper: 'inline-flex items-center justify-center gap-2',
      icon: ArrowRight,
      iconProps: { className: 'w-5 h-5' },
    },
    gallery: {
      className: 'w-full sm:w-auto min-w-[200px]',
      size: 'xl',
      variant: 'glass',
      contentWrapper: 'inline-flex items-center justify-center gap-2',
      icon: Play,
      iconProps: { className: 'w-4 h-4 fill-current' },
    },
  },

  statsGrid: 'grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-5xl mt-12 animate-fade-in relative z-20',
  statItem: 'flex flex-col items-center text-center group',
  statIconWrap: 'mb-4 p-3 rounded-2xl bg-secondary/30 border border-border/50 group-hover:border-primary/40 transition-colors',
  statIcon: 'h-6 w-6 text-primary',
  statNumber: 'text-4xl md:text-5xl font-black tracking-tighter tabular-nums',
  statLabel: 'text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-2',
};
