import React, { useState } from 'react';
import { Guest } from '../types';
import { Send, CheckCircle2, Crown, Music } from 'lucide-react';

interface RsvpFormProps {
  onSubmit: (guest: Guest) => void;
}

interface CompanionDetail {
  name: string;
  mainDish: string;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Guest> & { mainDish?: string, songRequest?: string }>({
    fullName: '',
    email: '',
    attending: 'yes',
    companions: 0,
    dietaryRestrictions: '',
    needsTransport: 'No',
    message: '',
    wantsToBeCaptain: false,
    mainDish: '', 
    songRequest: '',
  });
  
  const [companionDetails, setCompanionDetails] = useState<CompanionDetail[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCompanionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(e.target.value) || 0;
    
    if (count > 6) count = 6;
    if (count < 0) count = 0;

    setFormData({ ...formData, companions: count });

    setCompanionDetails(prev => {
      const newArr = [...prev];
      while (newArr.length < count) {
        newArr.push({ name: '', mainDish: '' });
      }
      if (newArr.length > count) {
        newArr.length = count;
      }
      return newArr;
    });
  };

  const handleCompanionDetailUpdate = (index: number, field: keyof CompanionDetail, value: string) => {
    const newArr = [...companionDetails];
    newArr[index][field] = value;
    setCompanionDetails(newArr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const allCompanionsValid = companionDetails.every(c => c.name.trim() && c.mainDish);
    if (companionDetails.length > 0 && !allCompanionsValid) {
      alert('Por favor, completa el nombre y plato de todos los acompañantes.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const companionsString = companionDetails.length > 0
        ? companionDetails.map((c, i) => `Acompanante ${i + 1}: ${c.name || 'Sin nombre'} (${c.mainDish || 'Sin plato'})`).join(' | ')
        : 'Ninguno';

      // EL TRUCO MAESTRO: Usamos URLSearchParams para saltarnos el bloqueo CORS del navegador
      const submitData = new URLSearchParams();
      
      // Configuraciones del servidor
      submitData.append("_subject", `¡Nueva confirmación de boda! - ${formData.fullName}`);
      submitData.append("_template", "table");
      submitData.append("_captcha", "false"); // Evitamos que pida verificación de semáforos por detrás

      // Datos de tu boda
      submitData.append("Nombre", formData.fullName || '');
      submitData.append("Email", formData.email || '');
      submitData.append("Asistencia", formData.attending === 'yes' ? 'Sí, allí estaré' : 'No podré asistir');
      submitData.append("Plato_Principal", formData.mainDish || 'No aplica');
      submitData.append("Numero_Acompanantes", String(formData.companions));
      submitData.append("Detalles_Acompanantes", companionsString);
      submitData.append("Alergias", formData.dietaryRestrictions || 'Ninguna');
      submitData.append("Transporte", formData.needsTransport || 'No');
      submitData.append("Capitan_Mesa", formData.wantsToBeCaptain ? 'Sí' : 'No');
      submitData.append("Canciones_Sugeridas", formData.songRequest || 'Ninguna');
      submitData.append("Mensaje", formData.message || 'Sin mensaje');

      // Enviamos la petición sin Content-Type explícito (URLSearchParams lo hace seguro)
      const response = await fetch("https://formsubmit.co/ajax/parasigmita@gmail.com", {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: submitData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error de servidor (${response.status}): ${errorText}`);
      }

      // Si todo sale bien, procesamos el alta en la web
      const safeId = (window.crypto && window.crypto.randomUUID) 
        ? window.crypto.randomUUID() 
        : Date.now().toString();

      const newGuest = {
        id: safeId,
        submittedAt: new Date().toISOString(),
        fullName: formData.fullName!,
        email: formData.email!,
        attending: formData.attending as 'yes' | 'no' | 'pending',
        companions: Number(formData.companions) || 0,
        dietaryRestrictions: formData.dietaryRestrictions || '',
        needsTransport: formData.needsTransport || 'No',
        message: formData.message || '',
        wantsToBeCaptain: formData.wantsToBeCaptain,
      } as Guest;

      onSubmit(newGuest);
      setIsSuccess(true);

    } catch (error: any) {
      console.error("Detalle del error:", error);
      // Alerta dinámica que te dirá el error exacto (CORS, 403, Failed to Fetch, etc)
      alert(`Lo sentimos, el envío falló. Detalle: ${error.message}. ¡Asegúrate de tener conexión y no usar navegadores ultra-privados (como Brave) para este paso!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      attending: 'yes',
      companions: 0,
      message: '',
      dietaryRestrictions: '',
      needsTransport: 'No',
      wantsToBeCaptain: false,
      mainDish: '',
      songRequest: ''
    });
    setCompanionDetails([]);
  };

  if (isSuccess) {
    const successMsg = formData.attending === 'yes' 
        ? `¡Gracias por confirmar tu asistencia, ${formData.fullName}! Nos hace muchísima ilusión poder compartir este día tan especial contigo.`
        : `Sentimos mucho que no puedas venir, ${formData.fullName}. ¡Te echaremos de menos!`;

    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200 animate-in fade-in duration-700">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-cinzel text-gray-800 mb-2">¡Confirmado!</h3>
        <p className="text-gray-600 font-serif italic mb-6">"{successMsg}"</p>
        <button 
          onClick={resetForm}
          className="text-sm text-green-700 underline hover:text-green-800"
        >
          Enviar otro formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-cinzel text-gray-800">Confirma tu Asistencia</h3>
        <p className="text-gray-500 text-sm mt-1">Por favor, rellena el formulario antes del 15 de septiembre de 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">Nombre Completo</label>
          <input
            required
            type="text"
            className="w-full border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">Email</label>
          <input
            required
            type="email"
            className="w-full border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 tracking-wide">¿Podrás asistir?</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="attending" 
              value="yes"
              checked={formData.attending === 'yes'}
              onChange={() => setFormData({ ...formData, attending: 'yes' })}
              className="accent-wedding-gold h-4 w-4"
            />
            <span className="text-gray-700">Sí, allí estaré</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="attending" 
              value="no"
              checked={formData.attending === 'no'}
              onChange={() => setFormData({ ...formData, attending: 'no' })}
              className="accent-wedding-gold h-4 w-4"
            />
            <span className="text-gray-700">No podré asistir</span>
          </label>
        </div>
      </div>

      {formData.attending === 'yes' && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          
          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">¿Para el plato principal vas a querer carne o pescado?</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="mainDish" 
                  value="Carne"
                  checked={formData.mainDish === 'Carne'}
                  onChange={() => setFormData({ ...formData, mainDish: 'Carne' })}
                  className="accent-wedding-gold h-4 w-4"
                />
                <span className="text-gray-700">Carne</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="mainDish" 
                  value="Pescado"
                  checked={formData.mainDish === 'Pescado'}
                  onChange={() => setFormData({ ...formData, mainDish: 'Pescado' })}
                  className="accent-wedding-gold h-4 w-4"
                />
                <span className="text-gray-700">Pescado</span>
              </label>
            </div>
          </div>

          <div className="space-y-2 mb-6">
             <label className="text-sm font-semibold text-gray-700 tracking-wide">Número de acompañantes (sin contarte a ti)</label>
             <input
               type="number"
               min="0"
               max="6" 
               className="w-full md:w-1/3 border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
               value={formData.companions}
               onChange={handleCompanionsChange} 
             />
          </div>

          {companionDetails.length > 0 && (
            <div className="p-5 mb-6 bg-gray-50 border border-gray-100 rounded-lg space-y-5 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-cinzel text-gray-800 font-semibold mb-2 border-b border-gray-200 pb-2">Detalles de los acompañantes</h4>
              
              {companionDetails.map((companion, index) => (
                <div key={index} className="space-y-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <p className="text-xs font-bold tracking-widest text-wedding-gold uppercase">Acompañante {index + 1}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <input
                      required
                      type="text"
                      className="w-full border-b border-gray-300 p-2 text-sm focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
                      placeholder="Nombre completo"
                      value={companion.name}
                      onChange={(e) => handleCompanionDetailUpdate(index, 'name', e.target.value)}
                    />
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                          required
                          type="radio" 
                          name={`compDish-${index}`} 
                          value="Carne"
                          checked={companion.mainDish === 'Carne'}
                          onChange={() => handleCompanionDetailUpdate(index, 'mainDish', 'Carne')}
                          className="accent-wedding-gold h-3.5 w-3.5"
                        />
                        <span className="text-gray-700">Carne</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                          required
                          type="radio" 
                          name={`compDish-${index}`} 
                          value="Pescado"
                          checked={companion.mainDish === 'Pescado'}
                          onChange={() => handleCompanionDetailUpdate(index, 'mainDish', 'Pescado')}
                          className="accent-wedding-gold h-3.5 w-3.5"
                        />
                        <span className="text-gray-700">Pescado</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-2 mb-6">
             <label className="text-sm font-semibold text-gray-700 tracking-wide">Alergias o Restricciones Alimentarias</label>
             <input
               type="text"
               className="w-full border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
               value={formData.dietaryRestrictions}
               onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
               placeholder="Ej. Celíaco, Vegano, Alergia a nueces..."
             />
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">¿Vas a necesitar servicio de transporte?</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="transport" 
                  value="Sí"
                  checked={formData.needsTransport === 'Sí'}
                  onChange={() => setFormData({ ...formData, needsTransport: 'Sí' })}
                  className="accent-wedding-gold h-4 w-4"
                />
                <span className="text-gray-700">Sí, por favor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="transport" 
                  value="No"
                  checked={formData.needsTransport === 'No' || formData.needsTransport === 'no'}
                  onChange={() => setFormData({ ...formData, needsTransport: 'No' })}
                  className="accent-wedding-gold h-4 w-4"
                />
                <span className="text-gray-700">No, gracias</span>
              </label>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200/50 mb-6">
             <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    checked={formData.wantsToBeCaptain || false}
                    onChange={(e) => setFormData({ ...formData, wantsToBeCaptain: e.target.checked })}
                    className="accent-wedding-gold h-4 w-4 mt-0.5"
                  />
                </div>
                <div>
                   <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                     <Crown className="w-4 h-4 text-yellow-500" />
                     ¿Te gustaría ser Capitán de Mesa?
                   </span>
                   <p className="text-xs text-gray-600 mt-1">
                     El Capitán es el encargado de animar su mesa, proponer brindis y asegurarse de que la fiesta no pare.
                   </p>
                </div>
             </label>
          </div>

          <div className="space-y-2 mb-6">
             <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 tracking-wide">
                <Music className="w-4 h-4 text-purple-500" />
                Una canción que no puede faltar
             </label>
             <input
               type="text"
               className="w-full border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
               value={formData.songRequest}
               onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
               placeholder="Ej. Bink's Sake, Bohemian Rhapsody..."
             />
             <p className="text-[10px] text-gray-400 italic mt-1 leading-tight text-justify">
               * Los novios se guardan el derecho de vetar canciones si se te ocurre pedir reguetón o flamenco, gracias.
             </p>
          </div>

        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 tracking-wide">Mensaje para los novios</label>
        <textarea
          rows={3}
          className="w-full border-2 border-gray-100 rounded-lg p-3 focus:border-wedding-gold focus:outline-none transition-colors resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Escribe algo bonito..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-wedding-gold-light py-3 px-6 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-cinzel tracking-wider flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Enviando...' : 'ENVIAR RESPUESTA'}
        {!isSubmitting && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
};
