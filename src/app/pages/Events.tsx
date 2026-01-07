import  { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Users, Calendar, Lightbulb, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'Projeção Mapeada',
      description: 'Transformamos qualquer superfície em uma tela dinâmica com projeções arquitetônicas personalizadas.',
      icon: <Sparkles className="w-8 h-8" />,
      features: ['Mapeamento 3D', 'Conteúdo customizado', 'Instalação técnica'],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
    },
    {
      id: 2,
      title: 'Eventos Corporativos',
      description: 'Soluções audiovisuais completas para conferências, lançamentos de produtos e convenções.',
      icon: <Users className="w-8 h-8" />,
      features: ['Palco e cenografia', 'Transmissão ao vivo', 'Iluminação profissional'],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
    },
    {
      id: 3,
      title: 'Shows e Festivais',
      description: 'Experiências visuais imersivas que elevam performances musicais e eventos culturais.',
      icon: <Play className="w-8 h-8" />,
      features: ['VJ ao vivo', 'Sincronização de áudio', 'Efeitos especiais'],
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
    },
    {
      id: 4,
      title: 'Consultoria Criativa',
      description: 'Desenvolvimento de conceitos visuais únicos para projetos especiais e instalações artísticas.',
      icon: <Lightbulb className="w-8 h-8" />,
      features: ['Conceito artístico', 'Planejamento técnico', 'Execução completa'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    }
  ];

  const events = [
    {
      date: '15 FEV',
      title: 'Festival de Música Eletrônica',
      location: 'São Paulo, SP',
      type: 'Show',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80'
    },
    {
      date: '22 FEV',
      title: 'Lançamento Tech Summit 2026',
      location: 'Rio de Janeiro, RJ',
      type: 'Corporativo',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80'
    },
    {
      date: '08 MAR',
      title: 'Projeção Monumental',
      location: 'Belém, PA',
      type: 'Instalação',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80'
    },
    {
      date: '20 MAR',
      title: 'Fashion Week Experience',
      location: 'Belo Horizonte, MG',
      type: 'Moda',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff]">
      {/* Hero Section with Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="K Projeções Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        </motion.div>
        
        <div className="relative text-center px-4 max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
              SERVIÇOS
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Criamos experiências visuais que transcendem o comum
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid with Images */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold">NOSSOS SERVIÇOS</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />
                
                <div className="absolute top-6 left-6 text-white/80">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-8 border border-white/10">
                <h3 className="text-3xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Saiba mais
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Events Section with Images */}
      <section className="py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6" />
              <span className="text-sm uppercase tracking-wider text-gray-400">Próximos Eventos</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold">
              AGENDA
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="relative h-96 overflow-hidden">
                  <motion.img
                    variants={imageVariants}
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                  />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-5xl font-bold">
                        {event.date}
                      </div>
                      <span className="text-sm border border-white px-4 py-2">
                        {event.type}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 flex items-center">
                        {event.location}
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </p>
                    </div>
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
        transition={{ duration: 1 }}
        className="relative py-40 px-4 md:px-8 overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            Vamos criar algo extraordinário juntos
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="bg-white text-black px-12 py-4 text-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Entre em contato
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;