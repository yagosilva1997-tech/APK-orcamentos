
import React, { useState } from 'react';
import { ICONS, BUSINESS_INFO } from '../constants';
import { AppSettings } from '../types';

interface ServiceRatingProps {
  onBack: () => void;
  settings: AppSettings;
}

const ServiceRating: React.FC<ServiceRatingProps> = ({ onBack, settings }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `⭐ AVALIAÇÃO DE SERVIÇO ⭐\n\nNota: ${rating} estrelas\nFeedback: ${comment}`;
    // Fix: Use settings.phone instead of BUSINESS_INFO.phone
    const url = `https://wa.me/${settings.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 animate-fadeIn min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="text-6xl animate-bounce">🙏</div>
        <h2 className="text-3xl font-bold text-yellow-400">Obrigado pelo seu Feedback!</h2>
        <p className="text-gray-400 max-w-md">Sua avaliação foi enviada e nos ajuda a manter o padrão de excelência da SoS Elétrica.</p>
        <button 
          onClick={onBack}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl border border-zinc-700 transition-all"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ICONS.Back />
        </button>
        <h2 className="text-3xl font-bold">Avaliar <span className="text-yellow-400">Serviço</span></h2>
      </div>

      <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <p className="text-gray-400 text-center mb-8">Sua opinião é fundamental para o Eng. Yago Silva e toda a equipe SoS Elétrica.</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <label className="text-white font-bold text-lg">Como você avalia nosso trabalho?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-all transform hover:scale-125 ${
                    star <= rating ? 'text-yellow-400' : 'text-zinc-700'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-yellow-400">
              {rating === 0 ? 'Selecione as estrelas' : rating === 5 ? 'Excelente!' : rating >= 3 ? 'Bom trabalho' : 'Pode melhorar'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Deixe um comentário (opcional)</label>
            <textarea
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 focus:border-yellow-400 outline-none transition-all"
              placeholder="Fale sobre a pontualidade, limpeza, qualidade..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:grayscale"
          >
            ENVIAR AVALIAÇÃO
          </button>
        </form>
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p className="text-xs uppercase tracking-[0.2em]">Padrão de Qualidade SoS Elétrica & Engenharia</p>
      </div>
    </div>
  );
};

export default ServiceRating;
