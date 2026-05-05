import React, { useState, useEffect } from 'react';
import { WEDDING_DATE } from '../constants';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +WEDDING_DATE - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6">
      <div className="text-3xl md:text-5xl font-cinzel text-wedding-gold font-semibold mb-1 shadow-sm">
        {value < 10 ? `0${value}` : value}
      </div>
      <span className="text-xs md:text-sm tracking-widest uppercase text-gray-500 font-sans">{label}</span>
    </div>
  );

  return (
    <div className="relative flex justify-center items-center py-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-wedding-gold/10 max-w-2xl mx-auto mt-8">
      {/* Sombrero de paja (Luffy) */}
      <div className="absolute -top-6 -right-5 md:-top-8 md:-right-8 z-20 transform rotate-[15deg] drop-shadow-lg">
        <svg viewBox="0 0 100 60" className="w-20 h-12 md:w-28 md:h-16" xmlns="http://www.w3.org/2000/svg">
          {/* Cúpula del sombrero */}
          <path d="M 25 45 C 25 5, 75 5, 75 45 Z" fill="#f4d03f" />
          {/* Textura de la cúpula (líneas ligeras de paja) */}
          <path d="M 35 15 C 35 15, 30 35, 30 40 M 65 15 C 65 15, 70 35, 70 40 M 50 10 L 50 35" stroke="#e67e22" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          {/* Cinta roja (más gruesa) */}
          <path d="M 25.5 32 C 40 40, 60 40, 74.5 32 L 75 45 C 60 52, 40 52, 25 45 Z" fill="#e74c3c" />
          {/* Borde del sombrero (Ala) */}
          <ellipse cx="50" cy="45" rx="45" ry="8" fill="#f4d03f" stroke="#e67e22" strokeWidth="1.5" />
          {/* Textura del ala */}
          <path d="M 15 45 L 20 48 M 85 45 L 80 48 M 35 50 L 40 51 M 65 50 L 60 51" stroke="#e67e22" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          {/* Borde interior / separación */}
          <path d="M 25 45 C 25 5, 75 5, 75 45 Z" fill="none" stroke="#e67e22" strokeWidth="1.5" />
          <path d="M 25 45 C 40 52, 60 52, 75 45" fill="none" stroke="#c0392b" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="text-2xl text-gray-300 pb-4">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-2xl text-gray-300 pb-4">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <div className="text-2xl text-gray-300 pb-4">:</div>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};