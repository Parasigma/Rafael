import React, { useEffect, useState } from 'react';
import { getVenueWeather } from '../services/geminiService';
import { WeatherData } from '../types';
import { CloudSun, Loader2, MapPin } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getVenueWeather();
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-wedding-gold">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        <span className="font-serif">Consultando el clima en Alicante...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wedding-gold max-w-md mx-auto transform transition hover:scale-105 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
           <h3 className="text-xl font-cinzel text-gray-800 flex items-center gap-2">
             <MapPin className="h-5 w-5 text-wedding-gold" />
             El Poblet de las Atalayas
           </h3>
           <p className="text-sm text-gray-500 font-sans mt-1">{weather?.location}</p>
        </div>
        <div className="text-4xl">{weather?.icon}</div>
      </div>
      
      <div className="flex items-end gap-2 mb-3">
        <span className="text-4xl font-light text-gray-900">{weather?.temperature}</span>
        <span className="text-lg text-gray-600 mb-1 font-sans">{weather?.condition}</span>
      </div>
      
      <p className="text-gray-600 italic font-serif border-l-2 border-pink-200 pl-4">
        "{weather?.description}"
      </p>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs text-gray-400">
        <CloudSun className="h-3 w-3 mr-1" />
        <span>Live report via Gemini AI</span>
      </div>
    </div>
  );
};