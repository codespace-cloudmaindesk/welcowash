import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Grid,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

export const galleryStyles = {
  section: 'py-24 relative bg-background overflow-hidden',

  hero: {
    wrapper: 'relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden',
    glow: 'absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full opacity-50',
    badge: 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6',
    heading: 'text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tighter',
    gradient: 'text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600',
    subtitle: 'text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed',
  },

  grid: {
    wrapper: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
    item: 'group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]',
    image: 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110',
    overlay: 'absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100',
    content: 'absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-all duration-300',
    category: 'text-primary text-xs font-bold uppercase tracking-widest mb-1 block',
    title: 'text-xl font-bold text-white mb-2',
    compare: 'flex items-center gap-2 text-white/80 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100',
  },

  icons: {
    sparkles: { component: Sparkles, className: 'w-3 h-3' },
    grid: { component: Grid, className: 'w-5 h-5 text-primary' },
    layers: { component: Layers, className: 'w-3 h-3' },
    arrow: { component: ArrowRight, className: 'w-5 h-5 text-primary transition-all' },
    chevronLeft: { component: ChevronLeft, className: 'w-8 h-8' },
    chevronRight: { component: ChevronRight, className: 'w-8 h-8' },
    close: { component: X, className: 'w-8 h-8' },
  },

  buttons: {
    viewAll: {
      variant: 'ghost',
      size: 'lg',
      className:
        'group relative px-8 py-6 text-lg overflow-hidden rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300',
      content: 'relative flex items-center gap-3 font-bold tracking-wide',
      overlay: 'absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300',
    },
  },

  lightbox: {
    backdrop: 'fixed inset-0 z-2200 flex items-center justify-center bg-background/95 backdrop-blur-3xl',
    closeBtn: 'absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5',
    navBtn: 'p-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 transition-all hover:scale-110',
  },
};
