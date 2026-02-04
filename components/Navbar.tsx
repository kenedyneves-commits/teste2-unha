
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold italic text-xl">N</div>
          <span className="text-2xl font-serif text-rose-900 hidden sm:block">NailArt Pro</span>
        </div>

        <div className="flex items-center space-x-6 text-rose-800 font-medium">
          <button 
            onClick={() => setView('products')} 
            className={`hover:text-rose-500 transition-colors ${currentView === 'products' ? 'text-rose-500' : ''}`}
          >
            Produtos
          </button>
          <button 
            onClick={() => setView('consultant')} 
            className={`hover:text-rose-500 transition-colors ${currentView === 'consultant' ? 'text-rose-500' : ''}`}
          >
            IA Consultora
          </button>
          <button 
            onClick={() => setView('cart')} 
            className="relative p-2 text-rose-800 hover:text-rose-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
