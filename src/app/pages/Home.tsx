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
        "image": "https://kprojecoes.com.br/assets/logo.png",
        "description": "Especialistas em sonorização, iluminação e estrutura completa para eventos, formaturas e solenidades em Belém, Ananindeua e região.",
        "url": "https://kprojecoes.com.br",
        "telephone": "+5591981125595",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rod. Mário Covas",
            "addressLocality": "Ananindeua",
            "addressRegion": "PA",
            "postalCode": "67113-330",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.3624",
            "longitude": "-48.4277"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/kprojecoes",
            "https://www.facebook.com/kprojecoes",
            "https://www.linkedin.com/company/k-projecoes-eventos"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+5591981125595",
            "contactType": "customer service",
            "areaServed": "BR",
            "availableLanguage": "Portuguese"
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <SEO 
                title="Sonorização e Iluminação Profissional para Eventos" 
                description="Transformamos seu evento em uma experiência memorável com som e luz profissional. Especialistas em formaturas, casamentos e eventos corporativos."
                keywords="sonorização profissional, iluminação de eventos, estrutura para formaturas, som e luz belém, projeção mapeada"
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