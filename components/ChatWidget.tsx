import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init-1',
            role: 'model',
            text: 'Hello! I am the Cemento40 Assistant. Ask me about our engineering services, kiln optimization, or automation solutions.',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare history for API
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const responseText = await getGeminiResponse(history, userMsg.text);

            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 group font-display">
            {/* Chat Window */}
            <div 
                className={`mb-4 w-80 sm:w-96 flex-col rounded-xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'flex opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}
            >
                {/* Header */}
                <div className="bg-primary p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">smart_toy</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Cemento40 AI</h4>
                            <p className="text-xs text-blue-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                Gemini Powered
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Messages */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 h-80 overflow-y-auto flex flex-col gap-3">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`p-3 max-w-[85%] shadow-sm text-sm ${
                                msg.role === 'user' 
                                    ? 'self-end bg-primary text-white rounded-lg rounded-tr-none' 
                                    : 'self-start bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="self-start bg-white dark:bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm max-w-[85%]">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                    <div className="relative">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full rounded-full border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 py-2 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:text-white"
                            placeholder="Type a message..."
                            type="text"
                        />
                        <button 
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* FAB */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-transform hover:scale-110 active:scale-95"
            >
                <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'chat_bubble'}</span>
            </button>
        </div>
    );
};

export default ChatWidget;