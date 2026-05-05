import { WeatherData } from "../types";

export const getVenueWeather = async (): Promise<WeatherData> => {
  return {
    temperature: "22°C",
    condition: "Soleado",
    description: "Un brisa agradable perfecta para celebrar nuestro enlace.",
    icon: "☀️",
    location: "Alicante, España"
  };
};

export const generateThankYouMessage = async (name: string): Promise<string> => {
  return `¡Gracias ${name} por acompañarnos en este día tan especial!`;
};
