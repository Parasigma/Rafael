import React, { useState } from 'react';

export const ImuCharacter: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    // Auto-hide after some time
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div 
      className="absolute bottom-0 right-4 lg:right-[15%] w-16 h-28 transform translate-y-4 hover:translate-y-0 transition-transform duration-700 ease-in-out cursor-pointer z-10" 
      onClick={handleClick}
      title="Imu"
    >
      {showMessage && (
       <div className="absolute bottom-full right-0 mb-2 w-max max-w-[90vw] -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-bold py-2 px-3 rounded-xl shadow-lg border border-gray-200 whitespace-nowrap animate-bounce">
          ¡¡¡Joyboy!!!
          {/* Triangulito del bocadillo */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        </div>
      )}

      <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        {/* Silhouette */}
        <path d="M5,150 Q20,100 25,85 C30,70 38,50 38,40 L42,-5 L46,38 L50,-10 L54,38 L58,-5 L62,40 C62,50 70,70 75,85 Q80,100 95,150 Z" fill="#0d0d0d" stroke="#252525" strokeWidth="1" strokeLinejoin="round" />
        
        {/* Ojos Rojos (Rinnegan estilo Imu) */}
        <g transform="translate(0, -2)">
          {/* Ojo izquierdo */}
          <ellipse cx="38" cy="82" rx="4" ry="1.5" fill="#ff0000" />
          <circle cx="38" cy="82" r="0.8" fill="#0d0d0d" />
          
          {/* Ojo derecho */}
          <ellipse cx="62" cy="82" rx="4" ry="1.5" fill="#ff0000" />
          <circle cx="62" cy="82" r="0.8" fill="#0d0d0d" />
        </g>
      </svg>
    </div>
  );
};
