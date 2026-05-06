import { ScrollReveal } from './components/ScrollReveal';
import { ImuCharacter } from './components/ImuCharacter';
import { Lock, Heart, Flower, MapPin, Calendar, ArrowRight, Star, Leaf, Wine, Users, Clock } from 'lucide-react';
// Solo añade ChevronDown al final de esta lista que ya tienes:
import { Lock, Heart, Flower, MapPin, Calendar, ArrowRight, Star, Leaf, Wine, Users, Clock, ChevronDown } from 'lucide-react';

const TituloHaki = () => {
const [showHaki, setShowHaki] = useState(false);
@@ -246,6 +248,64 @@ const App: React.FC = () => {
</a>
</div>
</div>
        {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
         
         {/* Background Image Layer */}
         <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#0d161b]">
            <div className="absolute inset-0 bg-black/40 z-10"></div> 
            <img 
              src="./cabecera-boda.jpg" 
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

         {/* --- NUEVO: FLECHA ANIMADA PARA SCROLL --- */}
         <a 
            href="#details" 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-wedding-gold transition-colors duration-300 animate-bounce"
            aria-label="Desplazarse hacia abajo"
         >
            <ChevronDown className="h-10 w-10 drop-shadow-lg" strokeWidth={1.5} />
         </a>
         {/* --- FIN NUEVO --- */}

      </section>
</section>

{/* Countdown Section */}
