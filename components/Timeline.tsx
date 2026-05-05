import React from 'react';
import { Users, Heart, Wine, Utensils, Music, Sparkles } from 'lucide-react';

export const Timeline: React.FC = () => {
  const events = [
    {
      time: "11:30 - 12:00",
      title: "Recepción de Invitados",
      description: "Bienvenida en el patio principal con música suave y refrescos.",
      icon: <Users className="w-5 h-5 text-wedding-gold" />,
    },
    {
      time: "12:30 - 13:15",
      title: "Ceremonia Civil",
      description: "El momento del 'Sí, quiero' en los jardines centenarios.",
      icon: <Heart className="w-5 h-5 text-pink-400" />,
    },
    {
      time: "13:30 - 14:30",
      title: "Cóctel de Bienvenida",
      description: "Aperitivos gourmet y estación de bebidas bajo la pérgola.",
      icon: <Wine className="w-5 h-5 text-red-400" />,
    },
    {
      time: "14:45 - 16:30",
      title: "El Gran Banquete",
      description: "Almuerzo servido en mesa con menú degustación mediterráneo.",
      icon: <Utensils className="w-5 h-5 text-wedding-gold" />,
    },
    {
      time: "17:30 - 23:00",
      title: "Fiesta & Barra Libre",
      description: "¡A bailar! DJ, barra libre y recena para cerrar la noche mágica.",
      icon: <Music className="w-5 h-5 text-purple-400" />,
    }
  ];

  return (
    <div className="relative container mx-auto px-4 py-12">
      {/* Central Line (Desktop) / Left Line (Mobile) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-wedding-gold/40 to-transparent md:-translate-x-1/2"></div>

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for Desktop Alignment */}
              <div className="hidden md:block w-5/12"></div>

              {/* Icon Marker */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-wedding-cream shadow-lg z-10">
                 <div className="w-8 h-8 rounded-full bg-wedding-gold/10 flex items-center justify-center">
                    {event.icon}
                 </div>
              </div>

              {/* Content Card */}
              <div className="ml-16 md:ml-0 w-full md:w-5/12">
                 <div className={`
                    bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative
                    ${isEven ? 'md:text-right' : 'md:text-left'}
                 `}>
                    {/* Tiny connector arrow for desktop */}
                    <div className={`
                        hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45
                        ${isEven ? '-right-2 border-r border-t border-l-0 border-b-0' : '-left-2 border-l border-b border-t-0 border-r-0'}
                    `}></div>

                    <span className="inline-block px-3 py-1 bg-wedding-gold/10 text-wedding-gold text-xs font-bold rounded-full mb-2 font-sans tracking-wide">
                        {event.time}
                    </span>
                    <h3 className="text-xl font-cinzel font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-500 font-serif text-sm leading-relaxed">{event.description}</p>
                 </div>
              </div>

            </div>
          );
        })}
        
        {/* End Decoration */}
        <div className="relative flex justify-center mt-12">
             <div className="w-8 h-8 bg-wedding-gold/20 rounded-full flex items-center justify-center animate-pulse z-10">
                <Sparkles className="w-4 h-4 text-wedding-gold" />
             </div>
        </div>
      </div>
    </div>
  );
};
