// src/app/lib/analytics.ts
import { useEffect } from "react";

// Tipos específicos para Google Analytics
type GtagCommand = "js" | "config" | "event";
type GtagConfigParams = {
  [key: string]: string | number | boolean | Date;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

const GA_TRACKING_ID = "AW-XXXXXXXXXX"; // Substitua pelo seu ID real do Google Ads
const CONVERSION_ID = "AW-XXXXXXXXXX/xxxxx"; // Substitua pelo seu ID de conversão real

// Verifica se está em ambiente de produção
const isProduction =
  typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  !window.location.hostname.includes("127.0.0.1");

// Inicializa o Google Analytics
export const useAnalytics = () => {
  useEffect(() => {
    // Previne script de rodar em desenvolvimento ou se já existir
    if (!isProduction || document.querySelector(`script[src*="gtag/js"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    // Função gtag tipada
    function gtag(command: GtagCommand, ...args: unknown[]) {
      window.dataLayer.push([command, ...args]);
    }

    window.gtag = gtag;

    window.gtag("js", new Date());
    window.gtag("config", GA_TRACKING_ID);

    // Cleanup do script ao desmontar componente
    return () => {
      const scriptElement = document.querySelector(`script[src*="gtag/js"]`);
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);
};

// Rastreia um evento de conversão
export const trackConversion = (
  eventName: string,
  eventCategory?: string,
  eventLabel?: string
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    const params: GtagConfigParams = {
      send_to: CONVERSION_ID,
      event_category: eventCategory || eventName,
      event_label: eventLabel || "K Projeções Lead",
    };

    window.gtag("event", "conversion", params);

    if (!isProduction) {
      console.log(`Conversion tracked: ${eventName}`, params);
    }
  } else {
    if (!isProduction) {
      console.warn("Gtag not available for tracking.");
    }
  }
};
