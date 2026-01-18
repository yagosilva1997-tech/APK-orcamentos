
import React from 'react';
import { ICONS, BUSINESS_INFO } from '../constants';
import { AppSettings } from '../types';

interface EmergencyProps {
  onBack: () => void;
  settings: AppSettings;
}

const Emergency: React.FC<EmergencyProps> = ({ onBack, settings }) => {
  const handleCall = () => {
    // Fix: Use settings.phone instead of BUSINESS_INFO.phone
    window.open(`tel:${settings.phone}`);
  };

  const handleZap = () => {
    const text = "🚨 EMERGÊNCIA ELÉTRICA! Preciso de atendimento urgente.";
    // Fix: Use settings.phone instead of BUSINESS_INFO.phone
    window.open(`https://wa.me/${settings.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="p-6 animate-fadeIn min-h-[70vh] flex flex-col">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ICONS.Back />
        </button>
        <h2 className="text-3xl font-bold text-red-600 uppercase tracking-tighter">Atendimento <span className="text-white">Urgente</span></h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.6)] animate-bounce">
            <ICONS.Emergency />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl font-black text-white">CURTO-CIRCUITO OU CHEIRO DE QUEIMADO?</h3>
          <p className="text-gray-400 text-xl leading-relaxed">
            Mantenha a calma. Desligue o disjuntor geral e entre em contato imediatamente pelos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <button 
            onClick={handleCall}
            className="flex items-center justify-center gap-4 bg-white text-black font-black text-xl py-6 rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
          >
            <ICONS.Phone />
            LIGAR AGORA
          </button>
          <button 
            onClick={handleZap}
            className="flex items-center justify-center gap-4 bg-green-600 text-white font-black text-xl py-6 rounded-2xl hover:bg-green-700 transition-all active:scale-95 shadow-[0_10px_20px_rgba(22,163,74,0.3)]"
          >
            WHATSAPP SOS
          </button>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-red-900/30 w-full text-left">
          <h4 className="font-bold text-red-500 mb-4 flex items-center gap-2">
            ⚠️ Procedimentos de Segurança:
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• Não toque em fios desencapados ou quadros de energia fumegando.</li>
            <li>• Se houver fogo, chame também o Corpo de Bombeiros (193).</li>
            <li>• Afaste crianças e animais domésticos das áreas com defeito.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
