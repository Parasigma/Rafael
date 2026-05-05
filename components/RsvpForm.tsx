import React, { useState } from 'react';
import { Guest } from '../types';
import { Send, CheckCircle2, Crown } from 'lucide-react';
import { generateThankYouMessage } from '../services/geminiService';

interface RsvpFormProps {
  onSubmit: (guest: Guest) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Guest>>({
    fullName: '',
    email: '',
    attending: 'yes',
    companions: 0,
    dietaryRestrictions: '',
    needsTransport: 'no',
    message: '',
    wantsToBeCaptain: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get AI thank you message
    const msg = await generateThankYouMessage(formData.fullName);
    setSuccessMsg(msg);

    const newGuest: Guest = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      fullName: formData.fullName!,
      email: formData.email!,
      attending: formData.attending as 'yes' | 'no' | 'pending',
      companions: Number(formData.companions) || 0,
      dietaryRestrictions: formData.dietaryRestrictions || '',
      needsTransport: formData.needsTransport || 'no',
      message: formData.message || '',
      wantsToBeCaptain: formData.wantsToBeCaptain,
    };

    onSubmit(newGuest);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200 animate-in fade-in duration-700">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-cinzel text-gray-800 mb-2">¡Confirmado!</h3>
        <p className="text-gray-600 font-serif italic mb-6">"{successMsg}"</p>
        <button 
          onClick={() => { setIsSuccess(false); setFormData({ fullName: '', email: '', attending: 'yes', companions: 0, message: '', dietaryRestrictions: '', needsTransport: 'no', wantsToBeCaptain: false}) }}
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
             <label className="text-sm font-semibold text-gray-700 tracking-wide">Número de acompañantes (sin contarte a ti)</label>
             <input
               type="number"
               min="0"
               max="10"
               className="w-full md:w-1/3 border-b-2 border-gray-200 p-2 focus:border-wedding-gold focus:outline-none transition-colors bg-transparent"
               value={formData.companions}
               onChange={(e) => setFormData({ ...formData, companions: Number(e.target.value) })}
             />
          </div>
          
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
          
          {/* Captain Question */}
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
        className="w-full bg-gray-900 text-wedding-gold-light py-3 px-6 rounded-md hover:bg-gray-800 transition-all duration-300 font-cinzel tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : 'ENVIAR RESPUESTA'}
        {!isSubmitting && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
};