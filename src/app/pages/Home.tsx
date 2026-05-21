import { useAnalytics } from '../lib/analytics';

import { Header } from '../components/layout/Header';
import { Hero } from '../components/layout/Hero';
import { Services } from '../components/ui/Services';
import { EventTypes } from '../components/ui/EventTypes';
import { Differentials } from '../components/ui/Differentials';
import { Testimonials } from '../components/ui/Testimonials';
import { ContactForm } from '../components/ui/ContactForm';
import { ContactInfo } from '../components/ui/ContactInfo';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsAppButton } from '../components/ui/FloatingWhatsAppButton';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SEO } from '../components/ui/SEO';

import { services, eventTypes, testimonials, differentials } from '../lib/data';


export default function Home() {
    // Initialize Google Analytics for the page
    useAnalytics();

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "K Projeções & Eventos",
        "image": "/assets/logo.png",
        "description": "Especialistas em sonorização, iluminação e estrutura completa para eventos, formaturas e solenidades.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.5505",
            "longitude": "-46.6333"
        },
        "url": "https://kprojecoes.com.br",
        "telephone": "+550000000000",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/kprojecoes"
        ]
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <SEO 
                title="Página Inicial" 
                description="Transformamos seu evento em uma experiência memorável com som e luz profissional."
                structuredData={structuredData}
            />
            <Header />

            <main>
                <Hero />
                <Services services={services} />
                <EventTypes eventTypes={eventTypes} />
                <Differentials differentials={differentials} />
                <Testimonials testimonials={testimonials} />

                {/* Contact Section */}
                <AnimatedSection className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Solicite seu Orçamento</h2>
                            <p className="text-white/70 text-lg">Entre em contato e transforme seu evento em realidade</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ContactForm />
                            <ContactInfo />
                        </div>
                    </div>
                </AnimatedSection>
            </main>

            <Footer />

            <FloatingWhatsAppButton />
        </div>
    );
}