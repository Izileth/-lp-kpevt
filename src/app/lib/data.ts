// src/app/lib/data.ts
import React from "react";
import { MusicIcon, LightbulbIcon, LayersIcon } from "../components/ui/Icons";

export interface Service {
  title: string;
  description: string;
  Icon: React.FC;
}

export interface EventType {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  event: string;
  text: string;
}

export const services: Service[] = [
  {
    title: "Sonorização",
    description:
      "Equipamentos de alta qualidade para garantir o melhor som em seu evento, com técnicos especializados.",
    Icon: MusicIcon,
  },
  {
    title: "Iluminação",
    description:
      "Iluminação profissional que transforma ambientes e cria a atmosfera perfeita para cada momento.",
    Icon: LightbulbIcon,
  },
  {
    title: "Palco e Estrutura",
    description:
      "Montagem completa de palcos, tendas e estruturas para eventos de todos os tamanhos.",
    Icon: LayersIcon,
  },
];

export const eventTypes: EventType[] = [
  {
    title: "Formaturas",
    description: "Celebre essa conquista com toda pompa e circunstância",
    image: "1",
  },
  {
    title: "Solenidades",
    description:
      "Eventos corporativos e cerimoniais com elegância e profissionalismo",
    image: "2",
  },
  {
    title: "Bailes e Festas",
    description:
      "Diversão garantida com a melhor estrutura para sua celebração",
    image: "3",
  },
  {
    title: "Casamentos",
    description: "Torne seu grande dia ainda mais especial e inesquecível",
    image: "4",
  },
  {
    title: "Shows e Eventos",
    description: "Estrutura completa para apresentações e grandes eventos",
    image: "5",
  },
  {
    title: "Eventos Corporativos",
    description: "Palestras, convenções e eventos empresariais impecáveis",
    image: "6",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    event: "Formatura de Medicina",
    text: "A K Projeções superou todas as expectativas! O som estava perfeito e a iluminação deixou tudo ainda mais emocionante.",
  },
  {
    name: "João Santos",
    event: "Casamento",
    text: "Profissionalismo e atenção aos detalhes fizeram toda a diferença. Nosso casamento ficou perfeito!",
  },
  {
    name: "Ana Paula",
    event: "Evento Corporativo",
    text: "Equipe pontual, equipamentos de primeira linha. Recomendo para qualquer tipo de evento!",
  },
];

export const differentials: string[] = [
  "Equipamentos de última geração",
  "Equipe técnica especializada",
  "Atendimento personalizado",
  "Montagem e desmontagem ágil",
  "Suporte durante todo evento",
  "Orçamento sem compromisso",
];

export interface DifferentialsProps {
  differentials: string[];
}

export const partners = [
  { name: "Parceiro 1", logo: "P1" },
  { name: "Parceiro 2", logo: "P2" },
  { name: "Parceiro 3", logo: "P3" },
  { name: "Parceiro 4", logo: "P4" },
  { name: "Parceiro 5", logo: "P5" },
  { name: "Parceiro 6", logo: "P6" },
  { name: "Parceiro 7", logo: "P7" },
  { name: "Parceiro 8", logo: "P8" },
];
