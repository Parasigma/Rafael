import React, { useState } from 'react';
import { Guest } from '../types';
import { Send, CheckCircle2, Crown } from 'lucide-react';

interface RsvpFormProps {
  onSubmit: (guest: Guest) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit }) => {
  // Hemos añadido mainDish al estado inicial
  const [formData, setFormData] = useState<Partial<Guest> & { mainDish?: string }>({
    fullName: '',
    email: '',
    attending: 'yes',
    companions: 0,
    dietaryRestrictions: '',
    needsTransport: 'no',
    message: '',
    wantsToBeCaptain: false,
    mainDish: '', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    
    try {
      // 1. Conexión con FormSubmit para enviar el email
      await fetch("https://formsubmit.co/ajax/parasigmita@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // Configuraciones de FormSubmit
            _subject: `¡Nueva confirmación de boda! - ${formData.fullName}`,
            _cc: "lmarcosmarin@gmail.com", // Aquí añadimos el segundo correo
            _template: "table", // Diseño bonito para el correo
            
            // Datos del invitado que llegarán al correo
            Nombre: formData.fullName,
            Email: formData.email,
            Asistencia: formData.attending === 'yes' ? 'Sí, allí estaré' : 'No podré asistir',
            Plato_Principal: formData.mainDish || 'No aplica',
            Acompañantes: formData.companions,
            Alergias: formData.dietaryRestrictions || 'Ninguna',
            Transporte: formData.needsTransport,
            Capitan_Mesa: formData.wantsToBeCaptain ? 'Sí' : 'No',
            Mensaje: formData.message || 'Sin mensaje'
        })
      });

      // 2. Mensaje de éxito
      const msg = formData.attending === 'yes' 
        ? `¡Gracias por confirmar tu asistencia, ${formData.fullName}! Nos hace muchísima ilusión poder compartir este día tan especial contigo.`
        : `Sentimos mucho que no puedas venir, ${formData.fullName}. ¡Te echaremos de menos!`;
      setSuccessMsg(msg);

      // 3. Lógica interna de tu app
      const newGuest = {
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
      } as Guest;

      onSubmit(newGuest);
      setIsSuccess(true);

    } catch (error) {
      console.error("Error al enviar el formulario", error);
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200 animate-in fade-in duration-700">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-cinzel text-gray-800 mb-2">¡Confirmado!</h3>
        <p className="text-gray-600 font-serif italic mb-6">"{successMsg}"</p>
        <button 
          onClick={() => { setIsSuccess(false); setFormData({ fullName: '', email: '', attending: 'yes', companions: 0, message: '', dietaryRestrictions: '', needsTransport: 'no', wantsToBeCaptain: false, mainDish: ''}) }}
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
          
          {/* NUEVA PREGUNTA: CARNE O PESCADO */}
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
