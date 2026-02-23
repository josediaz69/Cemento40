
import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola, soy el asistente virtual de Cemento40. ¿Cómo puedo ayudarte con tus proyectos industriales hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await sendMessage(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, he experimentado un error. Por favor intenta de nuevo.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] max-h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Asistente Cemento40</h4>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Online AI</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50 custom-scrollbar h-[350px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="size-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="size-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="size-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu duda técnica..."
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="size-11 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-blue-600 active:scale-95 transition-all shadow-md disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">Potenciado por Gemini 3 Flash Preview</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-16 bg-primary hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 group relative"
      >
        <span className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform">
          {isOpen ? 'expand_more' : 'chat'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default GeminiChat;
