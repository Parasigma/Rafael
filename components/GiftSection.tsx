import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, HeartHandshake, Smartphone, Wallet, Landmark } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const GiftSection: React.FC = () => {
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedBizum, setCopiedBizum] = useState(false);
  
  const IBAN = "ES15 2100 8531 5813 0059 6025";
  const BIZUM = "690 960 261";

  const handleCopyIban = () => {
    navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleCopyBizum = () => {
    navigator.clipboard.writeText(BIZUM.replace(/\s/g, ''));
    setCopiedBizum(true);
    setTimeout(() => setCopiedBizum(false), 2000);
  };

  return (
    <section id="gift" className="py-20 bg-gradient-to-t from-white to-stone-50 border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <ScrollReveal>
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center animate-bounce">
                <Gift className="w-8 h-8 text-wedding-gold" />
             </div>
          </div>

          <h2 className="font-cinzel text-4xl text-gray-800 mb-6">Regalo de Boda</h2>
          
          <p className="font-serif text-gray-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Vuestra presencia es nuestro mayor regalo. No obstante, si queréis tener un detalle con nosotros para ayudarnos en nuestra nueva aventura, podéis hacerlo de la forma que mejor os venga y como podáis.
          </p>
        
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Bizum Option */}
          <ScrollReveal delay="delay-100">
            <div className="bg-white rounded-xl shadow-lg border border-wedding-gold/20 p-6 flex flex-col h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-12 -mt-12 opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4 mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-gray-800 mb-2">Bizum</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">
                La forma más rápida. Podéis enviar lo que queráis sin incluir ningún concepto, no es necesario.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
                <span className="font-mono text-gray-700 font-medium">{BIZUM}</span>
                <button onClick={handleCopyBizum} className="p-1.5 rounded-md hover:bg-white text-gray-400 hover:text-wedding-gold transition-colors">
                  {copiedBizum ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Efectivo Option */}
          <ScrollReveal delay="delay-200">
            <div className="bg-white rounded-xl shadow-lg border border-wedding-gold/20 p-6 flex flex-col h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-12 -mt-12 opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-4 mx-auto">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-gray-800 mb-2">Efectivo</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">
                Podéis dárnoslo en mano el mismo día de la boda o cuando nos veamos, ¡cuando mejor os venga!
              </p>
              <div className="bg-green-50/50 p-3 rounded-lg border border-green-100 flex items-center justify-center text-sm font-medium text-green-800 mt-auto">
                Siempre agradecido
              </div>
            </div>
          </ScrollReveal>

          {/* Transferencia Option */}
          <ScrollReveal delay="delay-300">
            <div className="bg-white rounded-xl shadow-lg border border-wedding-gold/20 p-6 flex flex-col h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-12 -mt-12 opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-600 mb-4 mx-auto">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel font-bold text-gray-800 mb-2">Transferencia</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">
                Si preferís una transferencia bancaria a nombre de Rafa & Laura, podéis hacerla a la siguiente cuenta.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
                <span className="font-mono text-gray-700 text-xs font-medium">{IBAN}</span>
                <button onClick={handleCopyIban} className="p-1.5 rounded-md hover:bg-white text-gray-400 hover:text-wedding-gold transition-colors ml-2 flex-shrink-0">
                  {copiedIban ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Funny Phrase */}
        <ScrollReveal delay="delay-400">
          <div className="mt-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300 inline-block">
             <p className="font-script text-3xl md:text-4xl text-wedding-gold drop-shadow-sm">
               ¡Y si quieres pagar la boda entera, mucho mejor! 
             </p>
             <div className="flex justify-end mt-2">
                <HeartHandshake className="w-6 h-6 text-sakura-dark opacity-60 flex-shrink-0" />
             </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
