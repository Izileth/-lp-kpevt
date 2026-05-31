import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Users, Calendar, Lightbulb, Sparkles, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';

const Events = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'Projeção Mapeada',
      description: 'Transformamos qualquer superfície em uma tela dinâmica com projeções arquitetônicas personalizadas.',
      icon: <Sparkles className="w-8 h-8" />,
      features: ['Mapeamento 3D', 'Conteúdo customizado', 'Instalação técnica'],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      route: '/services/projection-mapping'
    },
    {
      id: 2,
      title: 'Eventos Corporativos',
      description: 'Soluções audiovisuais completas para conferências, lançamentos de produtos e convenções.',
      icon: <Users className="w-8 h-8" />,
      features: ['Palco e cenografia', 'Transmissão ao vivo', 'Iluminação profissional'],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      route: '/services/corporate-events'
    },
    {
      id: 3,
      title: 'Shows e Festivais',
      description: 'Experiências visuais imersivas que elevam performances musicais e eventos culturais.',
      icon: <Play className="w-8 h-8" />,
      features: ['VJ ao vivo', 'Sincronização de áudio', 'Efeitos especiais'],
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
      route: '/services/shows-festivals'
    },
    {
      id: 4,
      title: 'Consultoria Criativa',
      description: 'Desenvolvimento de conceitos visuais únicos para projetos especiais e instalações artísticas.',
      icon: <Lightbulb className="w-8 h-8" />,
      features: ['Conceito artístico', 'Planejamento técnico', 'Execução completa'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      route: '/services/creative-consulting'
    }
  ];

  const events = [
    {
      date: '15 FEV',
      title: 'Festival de Música Eletrônica',
      location: 'São Paulo, SP',
      type: 'Show',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
      route: '/events/electronic-music-festival'
    },
    {
      date: '22 FEV',
      title: 'Lançamento Tech Summit 2026',
      location: 'Rio de Janeiro, RJ',
      type: 'Corporativo',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
      route: '/events/tech-summit-2026'
    },
    {
      date: '08 MAR',
      title: 'Projeção Monumental',
      location: 'Belém, PA',
      type: 'Instalação',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
      route: '/events/monumental-projection'
    },
    {
      date: '20 MAR',
      title: 'Fashion Week Experience',
      location: 'Belo Horizonte, MG',
      type: 'Moda',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
      route: '/events/fashion-week-experience'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.15 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  const handleEventClick = (route: string) => {
    navigate(route);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": "K Projeções & Eventos"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff]">
      <SEO 
        title="Nossos Serviços e Portfólio de Eventos" 
        description="Conheça nossos serviços especializados em projeção mapeada, sonorização e iluminação. Veja nossos cases em eventos corporativos, shows e festivais."
        keywords="projeção mapeada, eventos corporativos, sonorização de shows, iluminação cênica, vj para eventos"
        structuredData={structuredData}
      />
      {/* Hero Section with Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="K Projeções Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black" />
        </motion.div>

        <div className="relative text-center px-4 max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[2px] bg-white mx-auto mb-8"
            />
            <h1 className="text-8xl md:text-[10rem] font-bold mb-8 tracking-tighter leading-none">
              SERVIÇOS
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light tracking-wide"
          >
            Criamos experiências visuais que transcendem o comum
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm uppercase tracking-widest text-gray-400"
          >
            Explore
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Grid with Images */}
      <section className="py-40 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-white mb-6"
          />
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight">NOSSOS SERVIÇOS</h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Soluções completas em projeção e experiências audiovisuais
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid md:grid-cols-2 gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
              onClick={() => handleServiceClick(service.route)}
            >
              <div className="relative h-[450px] overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-all duration-700" />

                <motion.div
                  className="absolute top-8 left-8 text-white"
                  animate={{
                    scale: selectedService === service.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <motion.div
                    animate={{
                      y: selectedService === service.id ? -8 : 0
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-4xl font-bold mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="p-8 border border-white/10 bg-black/40 backdrop-blur-sm"
                animate={{
                  borderColor: selectedService === service.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'
                }}
              >
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-sm text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ChevronRight className="w-4 h-4 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="flex items-center text-sm font-semibold uppercase tracking-wider"
                  animate={{
                    x: selectedService === service.id ? 8 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Saiba mais
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-7xl mx-auto"
      />

      {/* Events Section with Images */}
      <section className="py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="w-7 h-7" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[1px] bg-white"
              />
              <span className="text-sm uppercase tracking-widest text-gray-400">Próximos Eventos</span>
            </div>
            <h2 className="text-7xl md:text-8xl font-bold tracking-tight">
              AGENDA
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="grid md:grid-cols-2 gap-10"
          >
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => handleEventClick(event.route)}
              >
                <div className="relative h-[500px] overflow-hidden">
                  <motion.img
                    variants={imageVariants}
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-all duration-700" />

                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <motion.div
                        className="text-6xl font-bold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.date}
                      </motion.div>
                      <motion.span
                        className="text-xs border border-white/60 px-5 py-2 uppercase tracking-widest backdrop-blur-sm"
                        whileHover={{ borderColor: 'rgba(255,255,255,1)', backgroundColor: 'rgba(255,255,255,0.1)' }}
                      >
                        {event.type}
                      </motion.span>
                    </div>

                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-4xl font-bold mb-3 tracking-tight leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 flex items-center text-lg">
                        {event.location}
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowUpRight className="w-6 h-6 ml-3" />
                        </motion.div>
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative py-48 px-4 md:px-8 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-white mx-auto mb-12"
          />
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-bold mb-12 leading-tight tracking-tight"
          >
            Vamos criar algo<br />extraordinário juntos
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: '#f5f5f5' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="bg-white text-black px-16 py-5 text-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors inline-flex items-center gap-3"
          >
            Entre em contato
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Events;