
import React, { useState, useRef, useEffect } from 'react';
import { getBeautyAdvice } from '../services/geminiService';

const NailConsultant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Olá, sou sua Consultora de Unhas IA! ✨ Qual seu humor hoje ou qual ocasião você está planejando? Posso te ajudar a escolher a cor perfeita!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const advice = await getBeautyAdvice(userMessage);
    
    setMessages(prev => [...prev, { role: 'bot', text: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-rose-100">
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white text-center">
        <h2 className="text-2xl font-serif font-bold">Consultora de Unhas IA</h2>
        <p className="text-rose-50 text-sm opacity-90">Descubra sua próxima nail art favorita</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-rose-50/20"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              m.role === 'user' 
                ? 'bg-rose-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-rose-100 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-rose-100 rounded-2xl rounded-tl-none p-4 shadow-sm animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-rose-100 flex space-x-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ex: Qual cor usar em um casamento?"
          className="flex-1 bg-rose-50/50 border border-rose-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </div>
    </div>
  );
};

export default NailConsultant;
