
import React, { useState } from 'react';
import { ICONS, getAppSettings } from '../constants';
import { AppSettings } from '../types';

interface AdminPanelProps {
  onBack: () => void;
  onUpdate: (settings: AppSettings) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(getAppSettings());
  const [showVercelGuide, setShowVercelGuide] = useState(false);

  const handleSave = () => {
    localStorage.setItem('sos_settings', JSON.stringify(localSettings));
    onUpdate(localSettings);
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ICONS.Back />
        </button>
        <h2 className="text-3xl font-bold">Painel do <span className="text-green-500">Administrador</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Form */}
        <section className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ICONS.Settings /> Configurações Gerais
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp (Formato: 55189...)</label>
              <input 
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none"
                value={localSettings.phone}
                onChange={e => setLocalSettings({...localSettings, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link do Google Drive (Público)</label>
              <input 
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none"
                value={localSettings.driveLink}
                onChange={e => setLocalSettings({...localSettings, driveLink: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email de Contato</label>
              <input 
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none"
                value={localSettings.email}
                onChange={e => setLocalSettings({...localSettings, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Endereço Completo</label>
              <input 
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none"
                value={localSettings.address}
                onChange={e => setLocalSettings({...localSettings, address: e.target.value})}
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl transition-all shadow-lg"
          >
            SALVAR ALTERAÇÕES
          </button>
        </section>

        {/* Vercel Guide Section */}
        <section className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🚀 Como subir para o Vercel?
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed">
            Para que seus clientes possam acessar o app pelo link oficial (ex: soseletrica.vercel.app), siga estes passos:
          </p>

          <div className="space-y-4">
             <div className="p-4 bg-black rounded-xl border border-zinc-800">
               <p className="text-white font-bold text-sm mb-1">1. Crie uma conta no GitHub</p>
               <p className="text-gray-500 text-xs">Crie um repositório novo e suba os arquivos do seu projeto para lá.</p>
             </div>
             <div className="p-4 bg-black rounded-xl border border-zinc-800">
               <p className="text-white font-bold text-sm mb-1">2. Vincule na Vercel</p>
               <p className="text-gray-500 text-xs">Acesse vercel.com, clique em "Add New Project" e escolha seu repositório do GitHub.</p>
             </div>
             <div className="p-4 bg-black rounded-xl border border-zinc-800">
               <p className="text-white font-bold text-sm mb-1">3. Configure a API KEY</p>
               <p className="text-gray-500 text-xs">Em "Environment Variables", adicione a chave <span className="text-yellow-400">API_KEY</span> com sua chave do Google Gemini para a IA funcionar.</p>
             </div>
          </div>

          <button 
            onClick={() => window.open('https://vercel.com', '_blank')}
            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            ABRIR VERCEL.COM ↗
          </button>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
