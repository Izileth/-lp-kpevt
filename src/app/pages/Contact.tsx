import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsAppButton } from '../components/ui/FloatingWhatsAppButton';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ContactForm } from '../components/ui/ContactForm';
import { ContactInfo } from '../components/ui/ContactInfo';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
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
};

export default Contact;