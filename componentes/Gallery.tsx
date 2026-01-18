
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

const DEFAULT_IMAGES: GalleryItem[] = [
  { id: '1', url: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&q=80&w=600", title: "Painéis Industriais", category: "Indústria" },
  { id: '2', url: "https://images.unsplash.com/photo-1452423668729-43a98052d3ee?auto=format&fit=crop&q=80&w=600", title: "Infraestrutura Comercial", category: "Comércio" },
  { id: '3', url: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=600", title: "Manutenção Preventiva", category: "Residencial" },
];

interface GalleryProps {
  onBack: () => void;
  isAdmin?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ onBack, isAdmin }) => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ url: '', title: '', category: 'Residencial' });

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sos_gallery');
    if (saved) {
      setImages(JSON.parse(saved));
    } else {
      setImages(DEFAULT_IMAGES);
    }
  }, []);

  const saveImages = (updated: GalleryItem[]) => {
    setImages(updated);
    localStorage.setItem('sos_gallery', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newItem.url || !newItem.title) return;
    const item: GalleryItem = {
      id: Date.now().toString(),
      ...newItem
    };
    saveImages([item, ...images]);
    setIsAdding(false);
    setNewItem({ url: '', title: '', category: 'Residencial' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Deseja realmente excluir esta foto da galeria?")) {
      saveImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ICONS.Back />
          </button>
          <h2 className="text-3xl font-bold">Portfólio de <span className="text-yellow-400">Serviços</span></h2>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            {isAdding ? 'Cancelar' : '＋ Adicionar Nova Foto'}
          </button>
        )}
      </div>

      {isAdding && isAdmin && (
        <div className="mb-12 bg-zinc-900 p-6 rounded-3xl border border-green-500/30 space-y-4 animate-fadeIn">
          <h3 className="text-xl font-bold text-green-500">Nova Foto do Portfólio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              className="bg-black border border-zinc-700 rounded-xl px-4 py-2"
              placeholder="URL da Imagem (Link)"
              value={newItem.url}
              onChange={e => setNewItem({...newItem, url: e.target.value})}
            />
            <input 
              className="bg-black border border-zinc-700 rounded-xl px-4 py-2"
              placeholder="Título do Serviço"
              value={newItem.title}
              onChange={e => setNewItem({...newItem, title: e.target.value})}
            />
            <select 
              className="bg-black border border-zinc-700 rounded-xl px-4 py-2"
              value={newItem.category}
              onChange={e => setNewItem({...newItem, category: e.target.value})}
            >
              <option>Residencial</option>
              <option>Predial</option>
              <option>Industrial</option>
              <option>Projeto</option>
            </select>
          </div>
          <button 
            onClick={handleAdd}
            className="w-full bg-green-500 text-black font-black py-3 rounded-xl hover:bg-green-400 transition-colors"
          >
            SALVAR NO PORTFÓLIO
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-zinc-900 aspect-square shadow-xl border border-zinc-800">
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 flex flex-col justify-end p-6">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
              <h3 className="text-white font-bold text-xl">{img.title}</h3>
            </div>
            
            {isAdmin && (
              <button 
                onClick={() => handleDelete(img.id)}
                className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-500 transition-colors z-20 shadow-lg"
                title="Excluir Foto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {!isAdmin && (
        <div className="mt-12 p-8 bg-zinc-900 rounded-2xl text-center border border-dashed border-zinc-700">
          <p className="text-gray-400 italic">"Qualidade não é opcional, é dever. Cada projeto é executado seguindo as normas técnicas vigentes."</p>
          <p className="mt-4 font-bold text-white">- Eng. Yago Silva</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
