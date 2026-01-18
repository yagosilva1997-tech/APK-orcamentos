
import React, { useState, useRef, useEffect } from 'react';
import { GGoogleGenAIoogleGenAI } from "@google/genai";

// ==========================================
// 1. CONFIGURAÇÕES E DADOS TÉCNICOS
// ==========================================
const BUSINESS = {
  name: "SoS Elétrica",
  responsible: "Yago Silva",
  title: "Engenheiro Eletricista Responsável",
  cnpj: "59.685.154/0001-07",
  email: "soseletrica2702@gmail.com",
  address: "Rua das Hortências, 109 - Tarumã, SP",
  phone: "5518981694832"
};

const INITIAL_SETTINGS = {
  driveLink: "https://drive.google.com/drive/folders/seu-id-aqui",
  phone: BUSINESS.phone,
  email: BUSINESS.email,
  address: BUSINESS.address
};

const PRICES = [
  { s: "Visita Técnica (Tarumã)", v: "GRÁTIS", d: "Orçamento sem custo na cidade" },
  { s: "Visita Técnica (Região/Assis)", v: "R$ 70,00", d: "Deslocamento e avaliação técnica" },
  { s: "Ponto de Tomada/Luz", v: "R$ 40,00", d: "Instalação de novo ponto" },
  { s: "Chuveiro Elétrico", v: "R$ 80 - 120", d: "Instalação e teste de segurança" },
  { s: "Ventilador de Teto", v: "R$ 150,00", d: "Montagem e ligação completa" },
  { s: "Projetos / ART", v: "Sob Consulta", d: "Assinatura técnica de Engenheiro" }
];

// ==========================================
// 2. SERVIÇO DE INTELIGÊNCIA ARTIFICIAL
// ==========================================
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const analyzeService = async (text: string) => {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise este problema elétrico: "${text}". Dê uma dica técnica rápida e estimativa de complexidade.`,
      config: { systemInstruction: "Você é o assistente técnico especializado do Eng. Yago da SoS Elétrica." }
    });
    return res.text;
  } catch (e) { return "Análise técnica indisponível no momento."; }
};

// ==========================================
// 3. COMPONENTES REUTILIZÁVEIS
// ==========================================
const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="mb-6 flex items-center text-yellow-400 font-black uppercase text-[10px] tracking-widest bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 active:scale-95 transition-all">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
    </svg>
    VOLTAR AO INÍCIO
  </button>
);

// ==========================================
// 4. APLICAÇÃO PRINCIPAL
// ==========================================
export default function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pass, setPass] = useState('');
  const [settings, setSettings] = useState(() => {
    const s = localStorage.getItem('sos_config');
    return s ? JSON.parse(s) : INITIAL_SETTINGS;
  });

  // Gatilho Secreto para Admin: 3 toques no CNPJ
  const count = useRef(0);
  const triggerAdm = () => {
    count.current++;
    if (count.current >= 3) { setShowLogin(true); count.current = 0; }
    setTimeout(() => count.current = 0, 2000);
  };

  // --- TELA: HOME ---
  const HomePage = () => (
    <div className="p-5 space-y-8 animate-fadeIn">
      <header className="relative h-[450px] rounded-[40px] overflow-hidden flex items-end p-8 shadow-2xl border border-zinc-800">
        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 w-full">
          <div className="bg-yellow-400 text-black text-[9px] font-black px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest shadow-lg">Engenharia Elétrica</div>
          <h1 className="text-4xl font-black mb-2 leading-none italic uppercase">SoS <span className="text-yellow-400">Elétrica</span></h1>
          <p className="text-zinc-300 text-sm mb-8 font-medium max-w-[200px]">Soluções profissionais com o Eng. {BUSINESS.responsible}</p>
          <div className="flex gap-3">
            <button onClick={() => setPage('quote')} className="bg-yellow-400 text-black font-black px-6 py-4 rounded-2xl text-[11px] uppercase tracking-wider flex-1 active:scale-95 transition-all shadow-xl">Orçamento</button>
            <button onClick={() => setPage('gallery')} className="bg-zinc-900/90 text-white font-bold px-6 py-4 rounded-2xl text-[11px] uppercase border border-zinc-700 flex-1 active:scale-95 transition-all">Galeria</button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setPage('prices')} className="bg-zinc-900 p-6 rounded-[30px] border border-zinc-800 text-left active:scale-95 transition-all">
          <span className="text-3xl block mb-3">💰</span>
          <span className="font-black block text-xs uppercase tracking-widest text-zinc-400">Preços</span>
          <span className="font-bold text-sm">Tabela Base</span>
        </button>
        <button onClick={() => window.open(settings.driveLink)} className="bg-zinc-900 p-6 rounded-[30px] border border-zinc-800 text-left active:scale-95 transition-all">
          <span className="text-3xl block mb-3">📂</span>
          <span className="font-black block text-xs uppercase tracking-widest text-zinc-400">Projetos</span>
          <span className="font-bold text-sm">Google Drive</span>
        </button>
      </div>

      <div className="bg-yellow-400 text-black p-8 rounded-[35px] shadow-xl transform rotate-1">
        <h2 className="font-black text-xl uppercase mb-2">📍 Atendimento</h2>
        <p className="text-sm font-bold">Tarumã: Orçamento Grátis!</p>
        <p className="text-[11px] mt-2 font-black opacity-60 uppercase tracking-tighter">Assis e região: Visita R$ 70,00</p>
      </div>

      <button onClick={() => setPage('emergency')} className="w-full bg-red-600 text-white p-6 rounded-[30px] font-black text-center animate-pulse flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all border-b-4 border-red-800">
        🚨 EMERGÊNCIA 24 HORAS
      </button>
      
      <button onClick={() => setPage('rating')} className="w-full bg-zinc-900 text-zinc-400 p-5 rounded-[30px] font-bold text-xs uppercase border border-zinc-800 active:scale-95 transition-all">
        ⭐ Avaliar nosso serviço
      </button>
    </div>
  );

  // --- TELA: ORÇAMENTO ---
  const QuotePage = () => {
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [iaMsg, setIaMsg] = useState('');
    
    const askIA = async () => {
      setLoading(true);
      const m = await analyzeService(desc);
      setIaMsg(m);
      setLoading(false);
    };

    const sendWpp = () => {
      const link = `https://wa.me/${settings.phone}?text=Olá SoS Elétrica! Preciso de um orçamento: ${desc}`;
      window.open(link);
    };

    return (
      <div className="p-6 animate-fadeIn min-h-screen">
        <BackBtn onClick={() => setPage('home')} />
        <h2 className="text-3xl font-black mb-2 uppercase italic">Solicitar <span className="text-yellow-400">Orçamento</span></h2>
        <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-bold">Análise técnica profissional</p>
        <div className="bg-zinc-900 p-8 rounded-[40px] space-y-6 border border-zinc-800 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">Descrição do Serviço</label>
            <textarea 
              placeholder="Ex: Instalação de chuveiro, fiação nova ou manutenção de quadro..." 
              className="w-full bg-black border border-zinc-800 rounded-2xl p-5 text-white text-sm focus:border-yellow-400 transition-colors outline-none" 
              rows={6} value={desc} onChange={e => setDesc(e.target.value)}
            />
          </div>
          <button onClick={askIA} disabled={loading || !desc} className="w-full bg-zinc-800 text-yellow-400 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest border border-yellow-400/10 active:scale-95 transition-all">
            {loading ? 'ANALISANDO COM IA...' : '⚡ PRÉ-ANÁLISE INTELIGENTE'}
          </button>
          {iaMsg && (
            <div className="p-6 bg-black/50 border-l-4 border-yellow-400 rounded-r-2xl text-xs italic text-zinc-300 leading-relaxed animate-fadeIn">
              "{iaMsg}"
            </div>
          )}
          <button onClick={sendWpp} className="w-full bg-yellow-400 text-black font-black py-5 rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-all text-sm">
            Enviar para WhatsApp
          </button>
        </div>
      </div>
    );
  };

  // --- TELA: TABELA ---
  const PricesPage = () => (
    <div className="p-6 animate-fadeIn min-h-screen">
      <BackBtn onClick={() => setPage('home')} />
      <h2 className="text-3xl font-black mb-8 uppercase italic">Tabela de <span className="text-yellow-400">Preços</span></h2>
      <div className="bg-zinc-900 rounded-[40px] border border-zinc-800 divide-y divide-zinc-800 overflow-hidden shadow-2xl">
        {PRICES.map(p => (
          <div key={p.s} className="p-6 flex justify-between items-center group active:bg-zinc-800/50">
            <div className="pr-4">
              <p className="font-black text-sm uppercase tracking-tighter">{p.s}</p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1 leading-tight">{p.d}</p>
            </div>
            <span className="font-black text-yellow-400 text-lg whitespace-nowrap">{p.v}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-zinc-600 text-center mt-8 uppercase font-bold tracking-widest">Valores sujeitos a alteração após visita técnica</p>
    </div>
  );

  // --- TELA: EMERGÊNCIA ---
  const EmergencyPage = () => (
    <div className="p-6 text-center space-y-10 animate-fadeIn min-h-screen flex flex-col justify-center">
      <div className="flex justify-start">
        <BackBtn onClick={() => setPage('home')} />
      </div>
      <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce shadow-[0_0_50px_rgba(220,38,38,0.5)]">🚨</div>
      <h2 className="text-4xl font-black text-red-600 uppercase italic tracking-tighter">Urgência 24H</h2>
      <p className="text-zinc-400 text-sm font-medium px-6">Curto-circuito, falta de energia ou cheiro de queimado? Não toque em nada e nos chame imediatamente!</p>
      <div className="grid gap-4 px-4">
        <button onClick={() => window.open(`tel:${settings.phone}`)} className="bg-white text-black font-black py-6 rounded-[30px] text-xl uppercase shadow-2xl active:scale-95 transition-all">📞 Ligar Agora</button>
        <button onClick={() => window.open(`https://wa.me/${settings.phone}?text=EMERGENCIA`)} className="bg-green-600 text-white font-black py-6 rounded-[30px] text-xl uppercase shadow-2xl active:scale-95 transition-all">💬 WhatsApp SOS</button>
      </div>
    </div>
  );

  // --- TELA: ADMIN ---
  const AdminPage = () => {
    const [local, setLocal] = useState(settings);
    const save = () => { localStorage.setItem('sos_config', JSON.stringify(local)); setSettings(local); alert("Configurações atualizadas!"); setPage('home'); };
    return (
      <div className="p-6 animate-fadeIn min-h-screen">
        <BackBtn onClick={() => setPage('home')} />
        <h2 className="text-3xl font-black mb-8 text-green-500 uppercase italic">Painel de <span className="text-white">Controle</span></h2>
        <div className="bg-zinc-900 p-8 rounded-[40px] space-y-6 border border-zinc-800 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">Link Google Drive (Galeria)</label>
            <input className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-sm outline-none focus:border-green-500 transition-colors" value={local.driveLink} onChange={e => setLocal({...local, driveLink: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">WhatsApp (DDD + Número)</label>
            <input className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-sm outline-none focus:border-green-500 transition-colors" value={local.phone} onChange={e => setLocal({...local, phone: e.target.value})} />
          </div>
          <button onClick={save} className="w-full bg-green-600 text-white font-black py-5 rounded-2xl uppercase mt-4 shadow-xl active:scale-95 transition-all">Salvar Alterações</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-8 backdrop-blur-md">
          <div className="bg-zinc-900 p-10 rounded-[40px] border-2 border-yellow-400 w-full max-w-xs text-center shadow-[0_0_80px_rgba(251,191,36,0.2)] animate-fadeIn">
            <div className="w-16 h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl">SOS</div>
            <h3 className="font-black mb-8 uppercase tracking-widest">Acesso Engenharia</h3>
            <input type="password" placeholder="SENHA" className="w-full bg-black border border-zinc-800 p-5 rounded-2xl mb-6 text-center text-xl font-black tracking-[0.5em] outline-none focus:border-yellow-400 transition-all" value={pass} onChange={e => setPass(e.target.value)} autoFocus />
            <button onClick={() => { if(pass==='admin2702'){setIsAdmin(true); setShowLogin(false);}else{alert("Senha Incorreta!"); setPass('');} }} className="w-full bg-yellow-400 text-black font-black py-5 rounded-2xl uppercase text-xs tracking-widest shadow-xl">Autenticar</button>
            <button onClick={() => setShowLogin(false)} className="mt-6 text-zinc-600 text-[10px] font-black uppercase tracking-widest block mx-auto">Fechar</button>
          </div>
        </div>
      )}

      {/* Navbar Superior */}
      <nav className="px-6 py-5 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur-xl z-50">
        <div onClick={() => setPage('home')} className="flex items-center gap-3 cursor-pointer">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-black text-sm transition-colors ${isAdmin ? 'bg-green-500 animate-pulse' : 'bg-yellow-400'}`}>SOS</div>
          <span className="font-black text-sm uppercase tracking-tighter italic">SoS Elétrica</span>
        </div>
        <div className="flex gap-2">
          {isAdmin && <button onClick={() => setPage('admin')} className="text-[9px] font-black bg-green-600/10 text-green-500 border border-green-500/20 px-4 py-2 rounded-full uppercase tracking-widest">Painel Admin</button>}
          <button onClick={() => setPage('emergency')} className="bg-red-600 text-white p-2 rounded-full active:scale-90 transition-all">🚨</button>
        </div>
      </nav>

      {/* Conteúdo Central */}
      <main className="max-w-md mx-auto min-h-[80vh] pb-10">
        {page === 'home' && <HomePage />}
        {page === 'quote' && <QuotePage />}
        {page === 'prices' && <PricesPage />}
        {page === 'emergency' && <EmergencyPage />}
        {page === 'admin' && <AdminPage />}
        {page === 'gallery' && (
          <div className="p-6 animate-fadeIn">
            <BackBtn onClick={() => setPage('home')} />
            <h2 className="text-3xl font-black mb-8 uppercase italic">Nosso <span className="text-yellow-400">Portfólio</span></h2>
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-zinc-900 rounded-3xl aspect-square overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all">
                  <img src={`https://images.unsplash.com/photo-${[
                    '1558402529-d2638a7023e9',
                    '1452423668729-43a98052d3ee',
                    '1544724569-5f546fd6f2b5',
                    '1621905251189-08b45d6a269e'
                  ][i-1]}?w=300`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div onClick={() => window.open(settings.driveLink)} className="bg-zinc-900 rounded-3xl aspect-square flex items-center justify-center p-6 text-center border-2 border-dashed border-zinc-800 active:bg-zinc-800">
                <p className="text-[10px] font-black uppercase text-zinc-500 leading-tight">Ver todas as fotos no Drive ↗</p>
              </div>
            </div>
          </div>
        )}
        {page === 'rating' && (
          <div className="p-8 text-center space-y-8 animate-fadeIn flex flex-col justify-center min-h-[70vh]">
             <BackBtn onClick={() => setPage('home')} />
             <div className="text-6xl">⭐</div>
             <h2 className="text-3xl font-black uppercase italic">Sua Avaliação</h2>
             <p className="text-zinc-500 text-sm">O Eng. Yago Silva agradece sua confiança. Como foi sua experiência?</p>
             <div className="flex justify-center gap-2 text-3xl">
               {[1,2,3,4,5].map(s => <span key={s} className="grayscale hover:grayscale-0 cursor-pointer transition-all">⭐</span>)}
             </div>
             <button onClick={() => window.open(`https://wa.me/${settings.phone}?text=Gostaria de avaliar o serviço...`)} className="bg-yellow-400 text-black font-black py-5 rounded-2xl uppercase text-xs tracking-widest w-full shadow-xl">Enviar Feedback</button>
          </div>
        )}
      </main>

      {/* Rodapé Oficial */}
      <footer className="p-12 border-t border-zinc-950 text-center space-y-6 bg-zinc-950/50">
        <div className="space-y-1">
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em]">{settings.address}</p>
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em]">{settings.email}</p>
        </div>
        <div onClick={triggerAdm} className="text-zinc-800 cursor-pointer text-[9px] font-black uppercase tracking-widest active:text-yellow-400 transition-colors">CNPJ: {BUSINESS.cnpj}</div>
        <div className="pt-6">
          <p className="font-black text-zinc-300 text-sm uppercase tracking-tighter italic">{BUSINESS.responsible}</p>
          <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest opacity-60">{BUSINESS.title}</p>
        </div>
        <p className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest">© 2025 SoS Elétrica Engenharia</p>
      </footer>
    </div>
  );
}
