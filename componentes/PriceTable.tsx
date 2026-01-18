
import React from 'react';
import { ICONS } from '../constants';

const SERVICES = [
  { name: "Visita Técnica (Tarumã)", price: "GRÁTIS", description: "Diagnóstico inicial sem custo para Tarumã" },
  { name: "Visita Técnica (Assis e Região)", price: "R$ 70,00", description: "Deslocamento e avaliação técnica especializada" },
  { name: "Ponto de Tomada", price: "R$ 40,00", description: "Instalação de novo ponto de energia" },
  { name: "Ponto de Iluminação", price: "R$ 45,00", description: "Instalação de novo ponto de luz" },
  { name: "Troca de Tomada/Interruptor", price: "R$ 25,00", description: "Valor por ponto trocado" },
  { name: "Instalação de Chuveiro", price: "R$ 80 a R$ 120", description: "Instalação e teste de funcionamento" },
  { name: "Instalação de Ventilador de Teto", price: "R$ 150,00", description: "Montagem, fixação e ligação elétrica" },
  { name: "Manutenção em Motores Elétricos", price: "Sob Orçamento", description: "Diagnóstico e reparo de motores" },
  { name: "Painéis de Distribuição e Automação", price: "Sob Orçamento", description: "Montagem industrial e automação" },
];

interface PriceTableProps {
  onBack: () => void;
}

const PriceTable: React.FC<PriceTableProps> = ({ onBack }) => {
  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ICONS.Back />
        </button>
        <h2 className="text-3xl font-bold">Tabela de <span className="text-yellow-400">Preços Base</span></h2>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-4 text-yellow-400 font-bold uppercase text-xs tracking-widest">Serviço</th>
                <th className="px-6 py-4 text-yellow-400 font-bold uppercase text-xs tracking-widest">Valor</th>
                <th className="px-6 py-4 text-yellow-400 font-bold uppercase text-xs tracking-widest hidden sm:table-cell">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {SERVICES.map((s, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-6 font-semibold text-white group-hover:text-yellow-400">{s.name}</td>
                  <td className="px-6 py-6 font-bold text-lg text-white">{s.price}</td>
                  <td className="px-6 py-6 text-gray-500 text-sm hidden sm:table-cell">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl">
        <h4 className="font-bold text-yellow-400 mb-2">Informações Importantes:</h4>
        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
          <li>Os valores acima referem-se à <span className="text-white">mão de obra</span>.</li>
          <li>Materiais de instalação não estão inclusos nos valores base.</li>
          <li>Serviços industriais e projetos exigem análise técnica detalhada.</li>
          <li>Atendemos normas técnicas <span className="text-white">NBR 5410 e NR-10</span>.</li>
          <li>Pagamento facilitado via Pix, Cartão de Crédito ou Débito.</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceTable;
