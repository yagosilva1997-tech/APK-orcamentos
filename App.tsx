
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import QuoteForm from './components/QuoteForm';
import Gallery from './components/Gallery';
import PriceTable from './components/PriceTable';
import Emergency from './components/Emergency';
import ServiceRating from './components/ServiceRating';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal from './components/AdminLoginModal';
import { AppSection, AppSettings } from './types';
import { getAppSettings, BUSINESS_INFO } from './constants';

export default function App() {
  const [page, setPage] = useState<AppSection>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());

  const handleNavigate = (section: AppSection) => {
    if (section === 'admin' && !isAdmin) {
      setShowLogin(true);
    } else {
      setPage(section);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      {/* Navbar Superior */}
      <nav className="px-6 py-5 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur-xl z-50">
        <div onClick={() => handleNavigate('home')} className="flex items-center gap-3 cursor-pointer">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-black text-sm transition-colors ${isAdmin ? 'bg-green-500' : 'bg-yellow-400'}`}>SOS</div>
          <span className="font-black text-sm uppercase tracking-tighter italic">SoS Elétrica</span>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <button 
              onClick={() => setPage('admin')} 
              className="text-[9px] font-black bg-green-600/10 text-green-500 border border-green-500/20 px-4 py-2 rounded-full uppercase tracking-widest"
            >
              Painel Admin
            </button>
          )}
          <button 
            onClick={() => handleNavigate('emergency')} 
            className="bg-red-600 text-white p-2 rounded-full active:scale-90 transition-all shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico */}
      <main className="max-w-6xl mx-auto">
        {page === 'home' && <Home onNavigate={handleNavigate} isAdmin={isAdmin} />}
        {page === 'quote' && <QuoteForm onBack={() => setPage('home')} settings={settings} />}
        {page === 'gallery' && <Gallery onBack={() => setPage('home')} isAdmin={isAdmin} />}
        {page === 'prices' && <PriceTable onBack={() => setPage('home')} />}
        {page === 'emergency' && <Emergency onBack={() => setPage('home')} settings={settings} />}
        {page === 'rating' && <ServiceRating onBack={() => setPage('home')} settings={settings} />}
        {page === 'admin' && <AdminPanel onBack={() => setPage('home')} onUpdate={setSettings} />}
      </main>

      {/* Modal de Acesso Admin */}
      <AdminLoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => { setIsAdmin(true); setPage('admin'); }} 
      />

      {/* Rodapé Oficial */}
      <footer className="p-12 border-t border-zinc-950 text-center space-y-6 bg-zinc-950/50 mt-20">
        <div className="space-y-1">
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em]">{settings.address}</p>
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em]">{settings.email}</p>
        </div>
        
        {/* Clique triplo no CNPJ para abrir admin (gatilho discreto) */}
        <div 
          onClick={() => !isAdmin && setShowLogin(true)} 
          className="text-zinc-800 cursor-pointer text-[9px] font-black uppercase tracking-widest hover:text-yellow-400 transition-colors"
        >
          CNPJ: {BUSINESS_INFO.cnpj}
        </div>
        
        <div className="pt-6">
          <p className="font-black text-zinc-300 text-sm uppercase tracking-tighter italic">{BUSINESS_INFO.responsible}</p>
          <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest opacity-60">
            Engenheiro Eletricista Responsável
          </p>
        </div>
        <p className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest">© 2025 SoS Elétrica Engenharia</p>
      </footer>
    </div>
  );
}
