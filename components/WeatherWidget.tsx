import React from 'react';
import { CloudSun, MapPin } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wedding-gold max-w-md mx-auto transform transition hover:scale-105 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
           <h3 className="text-xl font-cinzel text-gray-800 flex items-center gap-2">
             <MapPin className="h-5 w-5 text-wedding-gold" />
             El Poblet de las Atalayas
           </h3>
           <p className="text-sm text-gray-500 font-sans mt-1">Alicante, España</p>
        </div>
        <div className="text-4xl">☀️</div>
      </div>
      
      <div className="flex items-end gap-2 mb-3">
        <span className="text-4xl font-light text-gray-900">23°C</span>
        <span className="text-lg text-gray-600 mb-1 font-sans">Soleado</span>
      </div>
      
      <p className="text-gray-600 italic font-serif border-l-2 border-pink-200 pl-4">
        "Una brisa agradable perfecta para celebrar nuestro enlace."
      </p>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs text-gray-400">
        <CloudSun className="h-3 w-3 mr-1" />
        <span>Previsión del tiempo local</span>
      </div>
    </div>
  );
};