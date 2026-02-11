import { useEffect } from 'react';

export const useBodyLock = (locked: boolean) => {
    useEffect(() => {
        document.body.style.overflow = locked ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [locked]);
};
