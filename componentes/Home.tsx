
import React from 'react';
import { AppSection } from '../types';
import { BUSINESS_INFO } from '../constants';

interface HomeProps {
  onNavigate: (section: AppSection) => void;
  isAdmin?: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isAdmin }) => {
  return (
    <div className="p-6 space-y-12 animate-fadeIn">
      {isAdmin && (
        <div className="bg-green-600/20 border border-green-500/50 p-4 rounded-2xl flex items-center justify-between">
          <p className="text-green-500 font-bold text-sm flex items-center gap-2">
             <span className="animate-pulse">●</span> MODO ADMINISTRADOR ATIVO
          </p>
          <button 
            onClick={() => onNavigate('admin')}
            className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
          >
            Configurações do App
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden h-[500px] flex items-end shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop" 
          alt="Eletricista Profissional" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 p-8 md:p-12 w-full">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg">
            <span className="animate-pulse">●</span> Engenharia Elétrica & Manutenção
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
            Soluções Elétricas <br/> <span className="text-yellow-400">Inteligentes.</span>
          </h2>
          <p className="text-gray-200 max-w-2xl text-lg mb-8 leading-relaxed font-medium">
            Projetos de <span className="text-yellow-400 font-bold">Baixa e Média Tensão</span> com o rigor técnico do Eng. Yago Silva. Atendemos setores residenciais, prediais e industriais.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('quote')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-10 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_20px_rgba(251,191,36,0.4)]"
            >
              SOLICITAR ORÇAMENTO
            </button>
            <button 
              onClick={() => onNavigate('emergency')}
              className="bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md text-white font-bold px-10 py-4 rounded-2xl transition-all border border-zinc-700"
            >
              EMERGÊNCIA 24H
            </button>
          </div>
        </div>
      </section>

      {/* Specialities Section */}
      <section className="py-8">
        <h3 className="text-2xl font-black text-center mb-12 uppercase tracking-widest text-zinc-500">
          Nossas <span className="text-yellow-400">Especialidades</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SpecialityCard title="Residencial" desc="Instalações e manutenção preventiva." icon="🏠" />
          <SpecialityCard title="Predial" desc="Sistemas de energia e SPDA." icon="🏢" />
          <SpecialityCard title="Industrial" desc="Motores e comandos elétricos." icon="🏭" />
          <SpecialityCard title="Projetos" desc="Projetos de baixa e média tensão." icon="📐" />
        </div>
      </section>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuCard title="Galeria de Serviços" subtitle="Confira nosso portfólio" icon="🖼️" onClick={() => onNavigate('gallery')} />
        <MenuCard title="Tabela de Preços" subtitle="Valores base de serviços" icon="💰" onClick={() => onNavigate('prices')} />
        <MenuCard title="Avaliar Serviço" subtitle="Sua opinião importa" icon="⭐" onClick={() => onNavigate('rating')} />
      </div>

      {/* Location/Promo Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full"></div>
        <div className="text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
             <span className="text-2xl">📍</span>
             <h3 className="text-2xl font-black text-white">Onde Atendemos</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-yellow-400 font-bold uppercase text-xs tracking-widest">Tarumã - SP</p>
              <p className="text-gray-400">Orçamento <span className="text-white font-bold">100% Grátis</span> e visita sem custo.</p>
            </div>
            <div>
              <p className="text-white font-bold uppercase text-xs tracking-widest">Assis e Região</p>
              <p className="text-gray-400">Visita técnica especializada por <span className="text-yellow-400 font-bold">R$ 70,00</span>.</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto z-10">
          <button 
            onClick={() => onNavigate('quote')}
            className="w-full bg-white hover:bg-zinc-200 text-black font-black py-4 px-10 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            CONSULTAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
};

const SpecialityCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-yellow-400/30 transition-all text-center group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="font-bold text-white mb-2">{title}</h4>
    <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

const MenuCard = ({ title, subtitle, icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="p-8 rounded-3xl border border-zinc-800 transition-all text-left flex flex-col gap-6 group hover:-translate-y-2 bg-zinc-900 hover:border-yellow-400/50 hover:bg-zinc-800 shadow-lg"
  >
    <div className="text-5xl group-hover:rotate-12 transition-transform">{icon}</div>
    <div>
      <h3 className="font-black text-xl mb-1 text-white">{title}</h3>
      <p className="text-zinc-500 text-sm font-medium">{subtitle}</p>
    </div>
  </button>
);

export default Home;
