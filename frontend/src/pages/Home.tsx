import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from '../components/ui/animated-counter';
import { Button } from '../components/ui/Button';
import { ArrowRight, Play, Droplets, Map, CarTaxiFront } from 'lucide-react';
import styles from './Home.module.css';
import GallerySection from './Gallery';
import { BookingModal } from '../components/BookingModal';

// Move stats data outside the component for scalability
export const STATS = [
  { id: 'washes', icon: Droplets, label: 'Washes Completed', targetValue: 1.5, suffix: 'M+', precision: 1 },
  { id: 'cities', icon: Map, label: 'Cities Covered', targetValue: 50, suffix: '+', precision: 0 },
  { id: 'satisfaction', icon: CarTaxiFront, label: 'Customer Satisfaction', targetValue: 98, suffix: '%', precision: 0 },
];

const Home: React.FC = () => {
  // Modal state
  const [isBookingOpen, setBookingOpen] = useState(false);

  // Handler for opening modal
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <div className={styles.homeContainer}>
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.spotlight} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-background to-transparent z-10" />

        <div className={styles.heroContent}>
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-4 tracking-tighter leading-[1.1] animate-slide-up text-center">
            PREMIUM CAR CARE <br />
            <span className="text-gradient">DELIVERED TO YOU.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-slide-up text-center leading-relaxed">
            Enjoy professional, on-demand car wash services anytime, anywhere, delivered straight to your doorstep with instant tracking and loyalty rewards.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10 md:mb-20 animate-slide-up">
            <Button
              size="xl"
              variant="hero"
              className="w-full sm:w-auto min-w-[200px]"
              onClick={openBooking}
              aria-label="Book a Car Wash"
            >
              <span className="inline-flex items-center justify-center gap-2">
                Book a Wash
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>

            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto min-w-[200px]">
              <Link to="/gallery" className="inline-flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Gallery
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-5xl mt-12 animate-fade-in relative z-20">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center group">
                <div className="mb-4 p-3 rounded-2xl bg-secondary/30 border border-border/50 group-hover:border-primary/40 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>

                <div className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums">
                  <AnimatedCounter targetValue={stat.targetValue} precision={stat.precision} />
                  <span className="text-primary">{stat.suffix}</span>
                </div>

                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />
    </div>
  );
};

export default Home;
