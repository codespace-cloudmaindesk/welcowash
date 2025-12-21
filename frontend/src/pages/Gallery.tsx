
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Sparkles, X, ChevronLeft, ChevronRight, Grid, Layers, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Utility to handle dynamic imports in Vite
const getImageUrl = (name: string) => new URL(`../assets/${name}`, import.meta.url).href;

const GALLERY_ITEMS = [
    { id: 1, after: 'work-1.jpg', before: 'work-1.jpg', category: "Exterior Detail", title: "Ceramic Coating Finish" },
    { id: 2, after: 'work-2.jpg', before: 'work-2.jpg', category: "Luxury Care", title: "Premium Hand Wash" },
    { id: 3, after: 'work-3.jpg', before: 'work-3.jpg', category: "Interior Finish", title: "Leather Restoration" },
    { id: 4, after: 'work-4.jpg', before: 'work-4.jpg', category: "Full Service", title: "Complete Detailing" },
    { id: 5, after: 'work-5.jpg', before: 'work-5.jpg', category: "Paint Correction", title: "Swirl Mark Removal" },
    { id: 6, after: 'work-6.jpg', before: 'work-6.jpg', category: "Protection", title: "Wax & Sealant" },

    { id: 7, after: 'work-1.jpg', before: 'work-1.jpg', category: "Exterior Detail", title: "Wheel Polishing" },
    { id: 8, after: 'work-3.jpg', before: 'work-3.jpg', category: "Interior Finish", title: "Upholstery Deep Clean" },
    { id: 9, after: 'work-2.jpg', before: 'work-2.jpg', category: "Luxury Care", title: "Engine Bay Detail" },
    { id: 10, after: 'work-4.jpg', before: 'work-4.jpg', category: "Full Service", title: "Fleet Maintenance" },
    { id: 11, after: 'work-5.jpg', before: 'work-5.jpg', category: "Paint Correction", title: "Scratch Repair" },
    { id: 12, after: 'work-6.jpg', before: 'work-6.jpg', category: "Protection", title: "Glass Coating" },
];

const CATEGORIES = ["All", ...new Set(GALLERY_ITEMS.map(item => item.category))];

// --- Sub-Components ---

const BeforeAfterSlider: React.FC<{ before: string; after: string; title: string }> = ({ before, after, title }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => setIsResizing(true);
    const handleMouseUp = () => setIsResizing(false);

    // Improved touch and mouse handling attached to window
    useEffect(() => {
        const handleMove = (clientX: number) => {
            if (!isResizing) return;
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            setSliderPos((x / rect.width) * 100);
        };

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

        if (isResizing) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden rounded-xl bg-black group touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <img
                src={getImageUrl(after)}
                alt={`${title} After`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
                className="absolute top-0 left-0 h-full w-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img
                    src={getImageUrl(before)}
                    alt="Before"
                    className="w-full h-full object-cover filter saturate-[0.8] contrast-[0.85] brightness-[0.9] sepia-[0.15] blur-[0.5px]"
                    draggable={false}
                />
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest shadow-lg">
                    BEFORE
                </div>
            </div>

            <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest shadow-lg shadow-primary/5">
                AFTER
            </div>

            {/* Handle */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-white/80 cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors group-hover:bg-white"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)] group-active:scale-95 transition-transform duration-200">
                    <div className="flex gap-1">
                        <ChevronLeft className="w-3 h-3 text-white" />
                        <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- View Components ---

const ImageLightbox: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    items: typeof GALLERY_ITEMS;
    initialIndex: number;
}> = ({ isOpen, onClose, items, initialIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    if (!isOpen) return null;

    const currentItem = items[currentIndex];

    if (!currentItem) return null;

    // Use Portal for Lightbox to ensure it's on top of everything
    return createPortal(
        <div className="fixed inset-0 z-2200 flex items-center justify-center bg-background/95 backdrop-blur-3xl animate-fade-in">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>

            {/* Close */}
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-2210 border border-white/5 cursor-pointer">
                <X className="w-8 h-8" />
            </button>

            {/* Nav */}
            <button onClick={handlePrev} className="absolute left-4 md:left-8 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all backdrop-blur-sm border border-white/5 hidden md:block cursor-pointer hover:scale-110">
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={handleNext} className="absolute right-4 md:right-8 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all backdrop-blur-sm border border-white/5 hidden md:block cursor-pointer hover:scale-110">
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content */}
            <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
                <div className="w-full aspect-video md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-muted relative">
                    <BeforeAfterSlider
                        before={currentItem.before}
                        after={currentItem.after}
                        title={currentItem.title}
                    />
                </div>

                <div className="mt-8 text-center max-w-2xl animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                        {currentItem.category}
                    </div>
                    <h3 className="text-3xl font-heading font-black text-white mb-2">{currentItem.title}</h3>
                    <p className="text-muted-foreground font-mono text-sm">{currentIndex + 1} / {items.length}</p>
                </div>
            </div>

            {/* Mobile Nav Overlay (Bottom) */}
            <div className="absolute bottom-8 flex gap-4 md:hidden z-40">
                <button onClick={handlePrev} className="p-3 rounded-full bg-white/10 text-white border border-white/10"><ChevronLeft /></button>
                <button onClick={handleNext} className="p-3 rounded-full bg-white/10 text-white border border-white/10"><ChevronRight /></button>
            </div>
        </div>,
        document.body
    );
};

// Renamed and Prop-extended: GalleryGrid
const GalleryGrid: React.FC<{
    mode?: 'modal' | 'inline';
    isOpen?: boolean;     // Only relevant for modal mode
    onClose?: () => void; // Only relevant for modal mode
    onImageClick: (index: number, filteredItems: typeof GALLERY_ITEMS) => void
}> = ({ mode = 'modal', isOpen = false, onClose, onImageClick }) => {
    const [activeCategory, setActiveCategory] = useState("All");

    if (mode === 'modal' && !isOpen) return null;

    useEffect(() => {
        if (mode === 'modal' && isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [mode, isOpen]);

    const filteredItems = activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === activeCategory);

    // Aesthetics: Better Filter UI
    const FilterBar = (
        <div className="container mx-auto px-4 pb-8 pt-4 overflow-x-auto">
            <div className="flex justify-start md:justify-center gap-2 min-w-max">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                            ? 'text-black bg-primary shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                            : 'text-muted-foreground bg-secondary/50 hover:bg-secondary hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );

    const GridContent = (
        <div className="container mx-auto px-4 py-8 pb-32">
            <style>{`
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-grid-item {
                    animation: slide-up 0.5s ease-out forwards;
                }
            `}</style>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => onImageClick(index, filteredItems)}
                        className="group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer bg-muted border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:-translate-y-2 animate-grid-item"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <img
                            src={getImageUrl(item.after)}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            loading="lazy"
                        />
                        {/* Improved Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-0 left-0 p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                            <h4 className="text-white font-bold truncate text-lg">{item.title}</h4>
                        </div>

                        <div className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 shadow-lg border border-white/10">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (mode === 'modal') {
        const modalContent = (
            <div className="fixed inset-0 z-2000 bg-background/98 backdrop-blur-sm overflow-y-auto animate-fade-in">
                {/* Modal Header */}
                <div className="sticky top-0 z-2010 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
                    <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Grid className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xl font-heading font-black text-white tracking-tight">FULL GALLERY</span>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2.5 rounded-full bg-secondary/50 hover:bg-destructive/20 hover:text-destructive text-muted-foreground transition-all duration-300"
                        >
                            <span className="sr-only">Close</span>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {FilterBar}
                </div>
                {GridContent}
            </div>
        );
        return createPortal(modalContent, document.body);
    }

    // Inline Mode
    return (
        <div className="min-h-screen bg-background">
            {/* No Sticky Header for Inline, Filters are part of content flow */}
            <div className="sticky top-20 z-10 py-4 bg-background/95 backdrop-blur-sm border-b border-white/5 mb-8">
                {FilterBar}
            </div>
            {GridContent}
        </div>
    );
}

// --- NEW LIST VIEW FOR /gallery ROUTE ---
export const GalleryPage: React.FC = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItems, setLightboxItems] = useState(GALLERY_ITEMS);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const openLightbox = (index: number, items: typeof GALLERY_ITEMS) => {
        setLightboxItems(items);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-slide-up">
                        <Sparkles className="w-3 h-3" />
                        <span>Premium Portfolio</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tighter animate-slide-up" style={{ animationDelay: '100ms' }}>
                        Our Work <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Speaks</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
                        Browse our collection of precision detailing, ceramic coatings, and restoration projects. Every vehicle is treated as a masterpiece.
                    </p>
                </div>
            </section>

            <GalleryGrid mode="inline" onImageClick={openLightbox} />

            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                items={lightboxItems}
                initialIndex={lightboxIndex}
            />
        </>
    );
};


// --- Main Section Component (For Home Page) ---
export const GallerySection: React.FC = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItems, setLightboxItems] = useState(GALLERY_ITEMS);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightboxDirect = (index: number) => {
        setLightboxItems(GALLERY_ITEMS);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section id="gallery" className="py-24 relative bg-background overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <Sparkles className="w-3 h-3" />
                        <span>Our Masterpieces</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter">
                        See the <span className="text-gradient">Difference</span>
                    </h2>
                    <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
                        We rejuvenate vehicles using advanced techniques. Explore our recent work showcasing master-level care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 cursor-default">
                    {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative h-[300px] md:h-[350px] cursor-pointer rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-500 hover:-translate-y-2 border border-white/5"
                            onClick={() => openLightboxDirect(index)}
                        >
                            <img
                                src={getImageUrl(item.after)}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <Layers className="w-3 h-3" />
                                    <span>Compare Before/After</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="group relative px-8 py-6 text-lg overflow-hidden rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300"
                    >
                        <Link to="/gallery">
                            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-3">
                                <Grid className="w-5 h-5 text-primary" />
                                <span className="font-bold tracking-wide group-hover:text-primary transition-colors">View Full Gallery</span>
                                <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>

            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                items={lightboxItems}
                initialIndex={lightboxIndex}
            />
        </section>
    );
};

export default GallerySection;