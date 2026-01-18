
import React, { useState } from 'react';
import { ICONS, BUSINESS_INFO } from '../constants';
import { getSmartQuoteEstimate } from '../geminiService';
import { AppSettings } from '../types';

interface QuoteFormProps {
  onBack: () => void;
  settings: AppSettings;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onBack, settings }) => {
  const [loading, setLoading] = useState(false);
  const [aiEstimate, setAiEstimate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Tarumã',
    service: 'Residencial',
    description: ''
  });

  const handleAiConsult = async () => {
    if (!formData.description) return;
    setLoading(true);
    const estimate = await getSmartQuoteEstimate(formData.description);
    setAiEstimate(estimate || "Tivemos um problema.");
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá SoS Elétrica! Novo orçamento:\n\nNome: ${formData.name}\nLocal: ${formData.location}\nServiço: ${formData.service}\nDescrição: ${formData.description}`;
    // Fix: Use settings.phone instead of BUSINESS_INFO.phone which does not exist
    const url = `https://wa.me/${settings.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ICONS.Back />
        </button>
        <h2 className="text-3xl font-bold">Solicitar <span className="text-yellow-400">Orçamento</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
              <input 
                required
                type="text" 
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition-all"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Cidade</label>
                <select 
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option>Tarumã</option>
                  <option>Assis</option>
                  <option>Região</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tipo de Serviço</label>
                <select 
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option>Residencial</option>
                  <option>Predial</option>
                  <option>Industrial</option>
                  <option>Projeto Baixa Tensão</option>
                  <option>Projeto Média Tensão</option>
                  <option>Engenharia / ART</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Descrição do Problema / Serviço</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none"
                placeholder="Ex: Instalação de chuveiro, manutenção de quadro, nova fiação..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="button"
              onClick={handleAiConsult}
              disabled={loading || !formData.description}
              className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400 font-bold py-3 rounded-xl border border-yellow-400/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Analisando...' : '⚡ Análise Inteligente (IA)'}
            </button>
            <button 
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all shadow-lg"
            >
              ENVIAR PARA WHATSAPP
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {formData.location === 'Tarumã' ? '✅ Orçamento GRÁTIS em Tarumã' : '⚠️ Visita técnica: R$ 70,00'}
            </p>
          </div>
        </form>

        <div className="space-y-6">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span> Pré-Análise do Especialista IA
            </h3>
            {aiEstimate ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-black/50 p-6 rounded-2xl border-l-4 border-yellow-400 italic text-gray-300 leading-relaxed">
                  "{aiEstimate}"
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                  *Esta é uma estimativa preliminar baseada no seu relato. A visita técnica é fundamental para o orçamento final.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-600">
                <p>Preencha a descrição e use o botão de Análise Inteligente para obter uma prévia rápida da complexidade do seu serviço.</p>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h4 className="font-bold text-sm text-yellow-400 uppercase mb-4">Especialidades SoS</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">⚡ Residencial, Predial e Industrial</li>
                <li className="flex items-center gap-2">📐 Projetos Baixa e Média Tensão</li>
                <li className="flex items-center gap-2">✅ Engenheiro Eletricista Responsável</li>
                <li className="flex items-center gap-2">🛡️ Segurança Normativa NBR 5410</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
