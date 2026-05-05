import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export const VenueMap: React.FC = () => {
  // Coordinates for El Poblet de las Atalayas
  const MAP_URL = "https://www.google.com/maps/dir//El+Poblet+de+las+Atalayas,+Partida+de+las+Atalayas,+Poligono+B,+88,+03114+Alicante/@38.356277,-0.528414,17z";

  return (
    <div className="perspective-1000 w-full h-[400px] flex items-center justify-center group">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-2">
        
        {/* Card Container */}
        <div className="absolute inset-0 bg-wedding-cream rounded-xl shadow-2xl border border-wedding-gold/30 overflow-hidden flex flex-col transform rotate-x-2 transition-transform duration-500 hover:scale-[1.02]">
            
            {/* Visual Abstract Map Background */}
            <div className="relative h-2/3 bg-[#e8e4dc] overflow-hidden opacity-80">
                {/* Abstract Roads */}
                <div className="absolute top-0 left-1/3 w-4 h-full bg-white/60 transform -skew-x-12"></div>
                <div className="absolute top-1/2 left-0 w-full h-4 bg-white/60 transform -skew-y-6"></div>
                <div className="absolute top-0 right-1/4 w-2 h-full bg-white/40 transform skew-x-12"></div>
                
                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="relative">
                        <div className="w-4 h-4 bg-wedding-gold rounded-full animate-ping absolute inset-0"></div>
                        <MapPin className="h-8 w-8 text-red-800 relative z-10 drop-shadow-lg" fill="currentColor" />
                    </div>
                    <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm whitespace-nowrap border border-gray-200">
                        El Poblet de las Atalayas
                    </span>
                </div>
            </div>

            {/* Card Details Footer */}
            <div className="h-1/3 bg-white p-6 flex flex-col justify-between relative z-10">
                <div>
                    <h3 className="font-cinzel text-lg text-gray-800 font-bold">Cómo llegar</h3>
                    <p className="text-gray-500 text-sm font-sans mt-1">Partida de las Atalayas, Poligono B, 88<br/>03114 Alicante</p>
                </div>
                
                <a 
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-2 rounded hover:bg-wedding-gold transition-colors duration-300 font-cinzel text-sm"
                >
                    <Navigation className="h-4 w-4" />
                    Abrir en Google Maps
                    <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </a>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-wedding-gold/50 rounded-tr-xl pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-wedding-gold/50 rounded-bl-xl pointer-events-none"></div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-x-2 { transform: rotateX(2deg); }
        .rotate-y-2 { transform: rotateY(5deg); }
      `}</style>
    </div>
  );
};