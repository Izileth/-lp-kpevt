// src/app/lib/analytics.ts
import { useEffect } from 'react';

// Define a more specific type for Gtag if possible, but any is often pragmatic for external scripts
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GA_TRACKING_ID = 'AW-XXXXXXXXXX'; // Replace with your actual Google Ads ID
const CONVERSION_ID = 'AW-XXXXXXXXXX/xxxxx'; // Replace with your actual Conversion ID

// Initializes Google Analytics
export const useAnalytics = () => {
    useEffect(() => {
        // Prevent script from running in development or if it's already there
        if (process.env.NODE_ENV !== 'production' || document.querySelector(`script[src*="gtag/js"]`)) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        // Ensure gtag is a function
        window.gtag = window.gtag || function (...args: any[]) {
            window.dataLayer.push(args);
        };

        window.gtag('js', new Date());
        window.gtag('config', GA_TRACKING_ID);

        // Cleanup script on component unmount
        return () => {
            document.head.removeChild(script);
        };
    }, []);
};

// Tracks a conversion event
export const trackConversion = (eventName: string, eventCategory?: string, eventLabel?: string) => {
    if (window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': CONVERSION_ID,
            'event_category': eventCategory || eventName,
            'event_label': eventLabel || 'K Projeções Lead'
        });
        console.log(`Conversion tracked: ${eventName}`);
    } else {
        console.warn('Gtag not available for tracking.');
    }
};
