// src/app/hooks/useScrollVisibility.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if an element should be visible based on scroll position.
 * @param threshold - The scrollY position (in pixels) after which the element should be visible.
 * @returns `true` if window.scrollY is greater than the threshold, otherwise `false`.
 */
export const useScrollVisibility = (threshold: number): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isVisible;
};
