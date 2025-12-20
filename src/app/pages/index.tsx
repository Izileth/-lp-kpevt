import { useAnalytics } from '../lib/analytics';

import { Header } from '../components/k-projecoes/Header';
import { Hero } from '../components/k-projecoes/Hero';
import { Services } from '../components/k-projecoes/Services';
import { EventTypes } from '../components/k-projecoes/EventTypes';
import { Differentials } from '../components/k-projecoes/Differentials';
import { Testimonials } from '../components/k-projecoes/Testimonials';
import { ContactForm } from '../components/k-projecoes/ContactForm';
import { ContactInfo } from '../components/k-projecoes/ContactInfo';
import { Footer } from '../components/k-projecoes/Footer';
import { FloatingWhatsAppButton } from '../components/k-projecoes/FloatingWhatsAppButton';
import { AnimatedSection } from '../components/k-projecoes/AnimatedSection';

import { services, eventTypes, testimonials, differentials } from '../lib/data';


export default function KProjecoes() {
    // Initialize Google Analytics for the page
    useAnalytics();

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main>
                <Hero />
                <Services services={services} />
                <EventTypes eventTypes={eventTypes} />
                <Differentials differentials={differentials} />
                <Testimonials testimonials={testimonials} />

                {/* Contact Section */}
                <AnimatedSection id="contato" className="container mx-auto px-4 py-20">
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