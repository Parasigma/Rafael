import React from 'react';

export const Sakura: React.FC = () => {
  // Create an array of random petals
  const petals = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`,
    opacity: 0.3 + Math.random() * 0.5,
    size: 10 + Math.random() * 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-20px] bg-pink-200 rounded-full blur-[1px]"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: petal.opacity,
            animation: `fall ${petal.animationDuration} linear infinite`,
            animationDelay: petal.animationDelay,
            borderRadius: '100% 0 100% 0', // Leaf shape
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translate(0, -10px) rotate(0deg);
          }
          25% {
            transform: translate(20px, 25vh) rotate(45deg);
          }
          50% {
            transform: translate(-20px, 50vh) rotate(90deg);
          }
          75% {
            transform: translate(20px, 75vh) rotate(135deg);
          }
          100% {
            transform: translate(0, 105vh) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};