import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from '../../components/ui/animated-counter';
import { Button } from '../../components/ui/Button';
import GallerySection from '../Gallery';
import { BookingModal } from '../../components/BookingModal';

import { STATS } from './Home.constants';
import { homeStyles as s } from './Home.styles';

const Home: React.FC = () => {
    const [isBookingOpen, setBookingOpen] = useState(false);
    const openBooking = useCallback(() => setBookingOpen(true), []);
    const closeBooking = useCallback(() => setBookingOpen(false), []);

    const BookIcon = s.buttons.book.icon;
    const GalleryIcon = s.buttons.gallery.icon;

    return (
        <div className={s.container}>
            <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />

            {/* Hero Section */}
            <section className={s.hero}>
                <div className={s.spotlight} />
                <div className={s.heroGradientOverlay} />

                <div className={s.heroContent}>
                    <h1 className={s.heading}>
                        PREMIUM CAR CARE <br />
                        <span className={s.gradientText}>DELIVERED TO YOU.</span>
                    </h1>

                    <p className={s.subtitle}>
                        Enjoy professional, on-demand car wash services anytime, anywhere, delivered straight
                        to your doorstep with instant tracking and loyalty rewards.
                    </p>

                    <div className={s.ctaWrapper}>
                        <Button
                            size={s.buttons.book.size as any}
                            variant={s.buttons.book.variant as any}
                            className={s.buttons.book.className}
                            onClick={openBooking}
                            aria-label="Book a Car Wash"
                        >
                            <span className={s.buttons.book.contentWrapper}>
                                Book a Wash
                                <BookIcon {...s.buttons.book.iconProps} />
                            </span>
                        </Button>

                        <Button
                            asChild
                            size={s.buttons.gallery.size as any}
                            variant={s.buttons.gallery.variant as any}
                            className={s.buttons.gallery.className}
                        >
                            <Link to="/gallery">
                                <span className={s.buttons.gallery.contentWrapper}>
                                    <GalleryIcon {...s.buttons.gallery.iconProps} />
                                    Gallery
                                </span>
                            </Link>
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className={s.statsGrid}>
                        {STATS.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.id} className={s.statItem}>
                                    <div className={s.statIconWrap}>
                                        <Icon className={s.statIcon} aria-hidden="true" />
                                    </div>
                                    <div className={s.statNumber}>
                                        <AnimatedCounter targetValue={stat.targetValue} precision={stat.precision} />
                                        <span className="text-primary">{stat.suffix}</span>
                                    </div>
                                    <p className={s.statLabel}>{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <GallerySection />
        </div>
    );
};

export default Home;
