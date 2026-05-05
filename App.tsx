import React, { useState } from 'react';
import { ViewMode, Guest } from './types';
import { INITIAL_GUESTS, VENUE_NAME } from './constants';
import { Sakura } from './components/Sakura';
import { Countdown } from './components/Countdown';
import { WeatherWidget } from './components/WeatherWidget';
import { RsvpForm } from './components/RsvpForm';
import { AdminDashboard } from './components/AdminDashboard';
import { VenueMap } from './components/VenueMap'; 
import { Timeline } from './components/Timeline'; 
import { GiftSection } from './components/GiftSection'; 
import { ScrollReveal } from './components/ScrollReveal';
import { ImuCharacter } from './components/ImuCharacter';
import { Lock, Heart, Flower, MapPin, Calendar, ArrowRight, Star, Leaf, Wine, Users, Clock } from 'lucide-react';

const App: React.FC = () => {
  // Application State
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GUEST);
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Navigation Handlers
  const handleRsvpSubmit = (newGuest: Guest) => {
    setGuests(prev => [newGuest, ...prev]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'boda2026') { 
      setViewMode(ViewMode.ADMIN_DASHBOARD);
      setLoginError(false);
      setAdminPassword('');
    } else {
      setLoginError(true);
    }
  };

  // --- Admin Dashboard View ---
  if (viewMode === ViewMode.ADMIN_DASHBOARD) {
    return (
      <AdminDashboard 
        guests={guests} 
        onLogout={() => setViewMode(ViewMode.GUEST)} 
      />
    );
  }

  // --- Admin Login Modal (Simple Overlay) ---
  if (viewMode === ViewMode.ADMIN_LOGIN) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sakura-pink/20 relative">
        <Sakura />
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full z-10 mx-4 border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-6">
            <Lock className="h-10 w-10 text-wedding-gold mx-auto mb-2" />
            <h2 className="text-2xl font-cinzel text-gray-800">Acceso Novios</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-wedding-gold focus:outline-none"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
              />
              {loginError && <p className="text-red-500 text-xs mt-1">Contraseña incorrecta.</p>}
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => setViewMode(ViewMode.GUEST)}
                className="flex-1 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Volver
              </button>
              <button 
                type="submit"
                className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Guest View ---
  return (
    <div className="min-h-screen text-gray-800 font-sans relative">
      <Sakura />
      
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="font-script text-3xl md:text-4xl text-gray-900 cursor-pointer">
              Rafa & Laura
            </div>
            <div className="hidden md:flex space-x-8 items-center text-sm font-cinzel tracking-widest text-gray-600">
              <a href="#home" className="hover:text-wedding-gold transition-colors">Inicio</a>
              <a href="#details" className="hover:text-wedding-gold transition-colors">Detalles</a>
              <a href="#itinerary" className="hover:text-wedding-gold transition-colors">Itinerario</a>
              <a href="#rsvp" className="hover:text-wedding-gold transition-colors">Confirmar</a>
            </div>
            <button 
              onClick={() => setViewMode(ViewMode.ADMIN_LOGIN)}
              className="p-2 text-gray-400 hover:text-wedding-gold transition-colors rounded-full"
              title="Admin Login"
            >
              <Lock className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
         
         {/* Background Image Layer */}
         <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#0d161b]">
            <div className="absolute inset-0 bg-black/40 z-10"></div> 
            <img 
              src="/cabecera-boda.jpg" 
              alt="Pareja de novios en estilo One Piece"
              className="w-full h-full object-cover object-[center_20%] opacity-50" 
            />
         </div>

         {/* Decorative Circle */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-wedding-gold/20 rounded-full animate-spin [animation-duration:60s] pointer-events-none z-0" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[480px] md:h-[480px] border border-wedding-gold/10 rounded-full animate-spin [animation-duration:45s] pointer-events-none z-0" style={{ animationDirection: 'reverse' }} />

         <div className="z-10 animate-in fade-in zoom-in duration-1000 relative">
           <p className="font-cinzel tracking-[0.3em] text-gray-200 text-sm md:text-base mb-6 uppercase drop-shadow-md">
             Nos casamos
           </p>
           <h1 className="font-script text-7xl md:text-9xl text-white mb-6 drop-shadow-lg">
             Rafa <span className="text-wedding-gold">&</span> Laura
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-cinzel text-lg md:text-xl text-gray-100 mt-8 drop-shadow-md">
             <div className="flex items-center gap-2">
               <Calendar className="h-5 w-5 text-wedding-gold drop-shadow-md" />
               <span>10 de Octubre, 2026</span>
             </div>
             <span className="hidden md:inline text-wedding-gold">•</span>
             <div className="flex items-center gap-2">
               <MapPin className="h-5 w-5 text-wedding-gold drop-shadow-md" />
               <span>Alicante, España</span>
             </div>
           </div>
           
           <div className="mt-16">
             <a 
              href="#rsvp"
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-wedding-gold text-white font-cinzel tracking-widest text-sm hover:bg-white hover:text-gray-900 transition-colors duration-500 rounded-sm shadow-xl"
             >
               Confirmar Asistencia
               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
         </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-gradient-to-b from-white to-sakura-pink/10 py-16 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-8 w-8 text-wedding-gold mx-auto mb-6 animate-pulse" />
            <h2 className="font-cinzel text-3xl md:text-4xl mb-8 text-gray-800">La Cuenta Atrás</h2>
            <Countdown />
          </div>
        </ScrollReveal>
      </section>

      {/* Details & Location */}
      <section id="details" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sakura-pink/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-gold/5 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          <ScrollReveal className="relative z-10">
            <div className="space-y-8">
              <div>
                <h2 className="font-cinzel text-4xl mb-4 text-gray-900">El Lugar</h2>
                <div className="h-1 w-20 bg-wedding-gold mb-6"></div>
                <p className="font-serif text-lg leading-relaxed text-gray-600">
                  Celebraremos nuestro enlace en <span className="font-bold text-gray-800">{VENUE_NAME}</span>, 
                  una finca mágica en las afueras de Alicante, rodeados de jardines y bajo la cálida luz del Mediterráneo,
                  un lugar donde cada instante se convierte en un recuerdo inolvidable.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-wedding-cream p-6 rounded-lg shadow-sm border border-gray-100 hover:border-wedding-gold/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <Flower className="h-6 w-6 text-pink-300 mt-1" />
                      <div>
                        <h4 className="font-cinzel font-bold text-gray-800 mb-2">Código Vestimenta</h4>
                        <p className="text-gray-600 font-sans text-sm">Formal / Etiqueta.</p>
                      </div>
                    </div>
                </div>

                <div className="bg-wedding-cream p-6 rounded-lg shadow-sm border border-gray-100 hover:border-wedding-gold/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🇯🇵</div>
                      <div>
                        <h4 className="font-cinzel font-bold text-gray-800 mb-2">Estilo</h4>
                        <p className="text-gray-600 font-sans text-sm">
                          Toques Sakura & Minimalismo.
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Gallery & Weather Composition */}
          <ScrollReveal delay="delay-200">
            <div className="relative h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0 flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-wedding-gold/5 rounded-full blur-3xl -z-20"></div>
              
              {/* Watercolor Image */}
              <div className="w-full h-full max-w-[500px] absolute inset-0 m-auto -z-10 mix-blend-multiply">
                <img 
                  src="public/Gemini_Generated_Image_czf3i0czf3i0czf3.png" 
                  alt="La Finca" 
                  className="w-full h-full object-contain filter opacity-90"
                />
              </div>

              <div className="absolute -bottom-4 -left-2 md:bottom-4 md:-left-8 z-20 transform scale-90 md:scale-100 origin-bottom-left w-[400px] max-w-[90vw] shadow-2xl">
                <WeatherWidget />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Expanded Details Section */}
        <div className="mt-16 pt-16 border-t border-gray-100">
           <ScrollReveal>
             <div className="text-center mb-16">
                <span className="text-wedding-gold text-sm font-cinzel tracking-widest uppercase">Descubre más</span>
                <h2 className="font-script text-5xl md:text-6xl text-gray-800 mt-2">El Encanto de El Poblet</h2>
             </div>
           </ScrollReveal>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal className="order-2 lg:order-1">
                 <VenueMap />
              </ScrollReveal>

              <ScrollReveal className="order-1 lg:order-2 space-y-8 px-4" delay="delay-200">
                 <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-wedding-gold/10 flex items-center justify-center text-wedding-gold">
                       <Star className="h-6 w-6" />
                    </div>
                    <div>
                       <h3 className="font-cinzel text-xl text-gray-900 font-semibold mb-2">Historia Viva</h3>
                       <p className="font-serif text-gray-600 leading-relaxed">
                          El Poblet de las Atalayas es una finca histórica del siglo XVIII cuidadosamente restaurada. 
                          Su "Casa Grande", de arquitectura tradicional alicantina, y sus patios empedrados crean una atmósfera de elegancia atemporal que nos enamoró desde el primer momento.
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                       <h3 className="font-cinzel text-xl text-gray-900 font-semibold mb-2">Jardines Centenarios</h3>
                       <p className="font-serif text-gray-600 leading-relaxed mb-6">
                          La ceremonia tendrá lugar en los jardines principales, bajo la sombra de ficus centenarios y rodeados de vegetación mediterránea. 
                          Un oasis de paz y naturaleza a solo unos minutos del centro de Alicante.
                       </p>
                       <div className="flex gap-4">
                         <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-md">
                           <img src="https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1000&auto=format&fit=crop" alt="Parral El Poblet" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                         </div>
                         <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-md">
                           <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1000&auto=format&fit=crop" alt="Jardines detalle" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                         </div>
                       </div>
                    </div>
                 </div>


              </ScrollReveal>
           </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section id="itinerary" className="py-24 bg-sakura-pink/5">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
               <Clock className="h-8 w-8 text-wedding-gold mx-auto mb-4" />
               <h2 className="font-cinzel text-4xl text-gray-800 mb-4">Itinerario del Día</h2>
               <p className="text-gray-600 font-serif italic">Cada momento cuenta</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay="delay-300">
            <Timeline />
          </ScrollReveal>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 bg-gray-900 relative text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
           <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="font-script text-6xl mb-4 text-wedding-gold-light">RyL</h2>
             <p className="font-cinzel text-xl text-gray-300">Esperamos verte allí</p>
           </div>
           
           <div className="text-gray-800">
             <RsvpForm onSubmit={handleRsvpSubmit} />
           </div>
        </div>
      </section>

      {/* Gift Section */}
      <GiftSection />

      {/* Footer */}
      <footer className="bg-white py-12 text-center border-t border-gray-100 relative overflow-hidden">
        <div className="font-script text-3xl text-gray-800 mb-4">Rafa & Laura</div>
        <p className="text-gray-400 text-sm font-cinzel">10 • 10 • 2026</p>
        
        {/* Imu asomándose */}
        <ImuCharacter />
      </footer>
    </div>
  );
};

export default App;