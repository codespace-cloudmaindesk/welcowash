import { useState, useEffect } from 'react';

export const useScroll = (threshold: number = 50) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return isScrolled;
};
