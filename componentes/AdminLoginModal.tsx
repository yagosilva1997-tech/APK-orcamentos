
import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2702') {
      onSuccess();
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="bg-zinc-900 border-2 border-yellow-400 p-8 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(251,191,36,0.2)]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-black text-2xl font-black shadow-lg">
            SOS
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Acesso Restrito</h2>
          <p className="text-zinc-500 text-sm">Somente para Engenharia SoS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              autoFocus
              type="password"
              placeholder="Digite a senha"
              className={`w-full bg-black border-2 rounded-xl px-4 py-3 text-center text-xl font-bold tracking-[0.5em] outline-none transition-all ${
                error ? 'border-red-600 animate-shake' : 'border-zinc-800 focus:border-yellow-400'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-[10px] font-bold text-center mt-2 uppercase tracking-widest">Senha Incorreta</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            ENTRAR NO PAINEL
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full text-zinc-500 text-xs font-bold uppercase py-2 hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
