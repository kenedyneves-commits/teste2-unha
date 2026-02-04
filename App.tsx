
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import NailConsultant from './components/NailConsultant';
import { Product, CartItem, View } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={view} setView={setView} cartCount={cartCount} />

      <main className="flex-1 p-4 sm:p-8">
        {view === 'home' && (
          <section className="max-w-7xl mx-auto">
            <div className="relative rounded-[2rem] overflow-hidden bg-rose-900 h-[500px] flex items-center shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                alt="Banner"
              />
              <div className="relative z-10 px-8 sm:px-16 max-w-2xl">
                <h1 className="text-5xl sm:text-7xl font-serif text-white leading-tight">Suas unhas, sua arte.</h1>
                <p className="mt-6 text-xl text-rose-100 font-light">Os melhores produtos de nail art e consultoria personalizada com IA para realçar sua beleza natural.</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setView('products')}
                    className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    Comprar Agora
                  </button>
                  <button 
                    onClick={() => setView('consultant')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold transition-all"
                  >
                    Falar com a IA
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Destaques da Semana</h2>
                <button onClick={() => setView('products')} className="text-rose-600 font-bold hover:underline">Ver todos</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'products' && (
          <section className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <h2 className="text-4xl font-serif font-bold text-gray-900">Todos os Produtos</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none w-full md:w-64 shadow-sm"
                />
                <svg className="absolute left-3 top-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">Nenhum produto encontrado para "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-rose-500 font-bold underline"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </section>
        )}

        {view === 'consultant' && (
          <section className="max-w-4xl mx-auto mt-10">
            <NailConsultant />
          </section>
        )}

        {view === 'cart' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-10">Meu Carrinho</h2>
            {cart.length > 0 ? (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100">
                <div className="divide-y divide-rose-50">
                  {cart.map(item => (
                    <div key={item.id} className="p-6 flex items-center gap-6">
                      <img src={item.image} className="w-24 h-24 object-cover rounded-xl" alt={item.name} />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-rose-600 font-bold">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >-</button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-rose-50 p-8 flex flex-col items-end">
                  <div className="flex justify-between w-full max-w-[200px] mb-4">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-2xl font-bold text-rose-600">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setView('checkout')}
                    className="w-full sm:w-auto px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-rose-100">
                <svg className="mx-auto text-rose-200 mb-6" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
                <button 
                  onClick={() => setView('products')}
                  className="mt-6 px-8 py-3 bg-rose-500 text-white rounded-xl font-bold"
                >
                  Ver Produtos
                </button>
              </div>
            )}
          </section>
        )}

        {view === 'checkout' && (
          <section className="max-w-2xl mx-auto py-20 text-center bg-white rounded-3xl shadow-xl border border-rose-100 p-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Pedido Realizado!</h2>
            <p className="text-gray-500 mb-8">Obrigado por testar o NailArt Pro. Como este é um ambiente de teste, nenhum pagamento real foi processado.</p>
            <button 
              onClick={() => {
                setCart([]);
                setView('home');
              }}
              className="px-8 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg"
            >
              Voltar ao Início
            </button>
          </section>
        )}
      </main>

      <footer className="bg-rose-900 text-rose-100 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold italic">N</div>
              <span className="text-2xl font-serif text-white">NailArt Pro</span>
            </div>
            <p className="text-rose-200/70 text-sm leading-relaxed">Sua jornada de beleza começa aqui. Produtos premium e tecnologia para quem ama unhas impecáveis.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Menu</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><button onClick={() => setView('home')}>Home</button></li>
              <li><button onClick={() => setView('products')}>Produtos</button></li>
              <li><button onClick={() => setView('consultant')}>Consultora IA</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Contato</h4>
            <p className="text-sm opacity-80">Email: suporte@nailartpro.com</p>
            <p className="text-sm opacity-80 mt-2">WhatsApp: (11) 99999-9999</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-rose-800 text-center text-xs opacity-50">
          © 2024 NailArt Pro. Site para fins de teste.
        </div>
      </footer>
    </div>
  );
};

export default App;
